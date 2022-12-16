import { User } from "../../orm/entities";
import {
    UpdatePassword,
    UpdateUserInput,
    UsernamePasswordInput
} from "../inputs";
import { ValidateRegister } from "../validators";
import {
    Arg,
    Ctx,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware
} from "type-graphql";
import { getConnection, getRepository, Not } from "typeorm";
import argon2 from "argon2";
import {
    ACCOUNT_VERIFICATION_PREFIX,
    COOKIE_NAME,
    FORGET_PASSWORD_PREFIX
} from "../../constants";
import { sendMail, VerifyEmailTemplate } from "../../utils/SendEmail";
import { v4 } from "uuid";
import { isAuth } from "../../middleware";
import { FieldError } from "../../utils/Errors";

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    @UseMiddleware(isAuth)
    async staffOf(@Ctx() { req }: AppContext): Promise<User[]> {
        return await User.find({
            where: { Id: req.session.userId },
            relations: ["staffOf"]
        });
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async updatePassword(
        @Arg("options") options: UpdatePassword,
        @Ctx() { req }: AppContext
    ): Promise<UserResponse> {
        if (options.password !== options.repeatPassword) {
            return {
                errors: [
                    {
                        field: "repeatPassword",
                        message: "Passwords not matching"
                    }
                ]
            };
        }
        const hashPassword = await argon2.hash(options.password);
        const result = await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({
                Password: hashPassword
            })
            .where("Id=:id", { id: req.session.userId })
            .returning("*")
            .execute();

        if (!result.raw[0]) {
            return {
                errors: [
                    {
                        field: "user",
                        message: "User does not exist in database"
                    }
                ]
            };
        }

        req.session.userId = result.raw[0].id;
        return {
            user: result.raw[0]
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async updateUser(
        @Arg("options") options: UpdateUserInput,
        @Ctx() { req }: AppContext
    ): Promise<UserResponse> {
        let user;
        if (!options.password) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Password was empty"
                    }
                ]
            };
        }
        // @ts-ignore
        let hashedPassword = await argon2.hash(options.password);
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({
                    Name: options.name,
                    Surname: options.surname,
                    Email: options.email
                })
                .where("Id=:id", {
                    id: req.session.userId
                })
                .returning("*")
                .execute();
            user = result.raw[0];
        } catch (err) {
            if (err.code === "23505") {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "Email already taken"
                        }
                    ]
                };
            }
        }

        return { user };
    }

    @Mutation(() => UserResponse)
    async changePassword(
        @Arg("token") token: string,
        @Arg("newPassword") newPassword: string,
        @Arg("repeatNewPassword") repeatNewPassword: string,
        @Ctx() { redis }: AppContext
    ): Promise<UserResponse> {
        const key = FORGET_PASSWORD_PREFIX + token;
        const userID = await redis.get(key);

        if (!userID) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "Token expired"
                    }
                ]
            };
        }

        const userid = parseInt(userID);
        const userData = await User.findOne(userid);

        if (!userData) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "User no longer exists"
                    }
                ]
            };
        }

        if (newPassword !== repeatNewPassword) {
            return {
                errors: [
                    {
                        field: "repeatNewPassword",
                        message: "Passwords don't match"
                    }
                ]
            };
        }

        await User.update(
            { Id: userid },
            {
                Password: await argon2.hash(newPassword)
            }
        );

        await redis.del(key);

        return {
            user: userData
        };
    }

    @Mutation(() => Boolean)
    async forgetPassword(
        @Arg("email") email: string,
        @Ctx() { redis }: AppContext
    ) {
        const user = await User.findOne({ where: { Email: email } });
        if (!user) {
            return false;
        }

        const token = v4();
        await redis.set(
            FORGET_PASSWORD_PREFIX + token,
            user.Id,
            "EX",
            1000 * 60 * 60 * 24 * 3
        );

        await sendMail(
            email,
            "Change password",
            `<a href="${process.env.CORS_ORIGIN}/change-password/${token}">Reset password</a>`
        ).catch(console.error);
        return true;
    }

    @Query(() => User, { nullable: true })
    me(@Ctx() { req }: AppContext) {
        if (!req.session.userId) {
            return null;
        }

        return User.findOne(req.session.userId);
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { req }: AppContext
    ): Promise<UserResponse> {
        const user = await User.findOne({ where: { Email: email } });
        if (!user) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "Email doesn't exist"
                    }
                ]
            };
        } else if (!user.confirmed || user.confirmed === null) {
            return {
                errors: [
                    {
                        field: "confirmation",
                        message:
                            "Your account need verification! Please check your email for verification!"
                    }
                ]
            };
        }
        const valid = await argon2.verify(user.Password, password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message:
                            "Password you entered is not matching one in database"
                    }
                ]
            };
        }

        req.session.userId = user.Id;

        return {
            user
        };
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { redis }: AppContext
    ): Promise<UserResponse> {
        const errors = ValidateRegister(options);
        if (errors) {
            return { errors };
        }

        const hashPassword = await argon2.hash(options.password);
        let user = null;
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    Name: options.name,
                    Surname: options.surname,
                    Email: options.email,
                    Password: hashPassword,
                    confirmed: false
                })
                .returning("*")
                .execute();
            user = result.raw[0];

            const token = v4();
            await redis.set(
                ACCOUNT_VERIFICATION_PREFIX + token,
                user.Id,
                "EX",
                1000 * 60 * 60 * 24 * 3
            );

            await sendMail(
                options.email,
                "Verify account",
                VerifyEmailTemplate(token)
            ).catch(console.error);
        } catch (err) {
            if (err.code === "23505") {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "Email already taken"
                        }
                    ]
                };
            }
        }

        return { user };
    }

    @Mutation(() => UserResponse)
    async resendEmail(
        @Arg("email") email: string,
        @Ctx() { redis }: AppContext
    ): Promise<UserResponse> {
        const user = await User.findOne({
            where: {
                Email: email
            }
        });

        if (!user) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "This email doesn't exist in database"
                    }
                ]
            };
        }

        const token = v4();
        await redis.set(
            ACCOUNT_VERIFICATION_PREFIX + token,
            user.Id,
            "EX",
            1000 * 60 * 60 * 24 * 3
        );

        await sendMail(
            email,
            "Verify account",
            VerifyEmailTemplate(token)
        ).catch((err) => {
            console.error(err);
        });

        return {
            user
        };
    }

    @Mutation(() => UserResponse)
    async verifyAccount(
        @Arg("token") token: string,
        @Ctx() { req, redis }: AppContext
    ): Promise<UserResponse> {
        const key = ACCOUNT_VERIFICATION_PREFIX + token;
        const userID = await redis.get(key);

        if (!userID) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "Token expired"
                    }
                ]
            };
        }

        const userId = parseInt(userID);
        const userData = await User.findOne(userId);

        if (!userData) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "User no longer exists"
                    }
                ]
            };
        }

        await User.update(
            { Id: userData.Id },
            {
                confirmed: true
            }
        );

        req.session.userId = userData.Id;

        await redis.del(key);

        return {
            user: userData
        };
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() { req, res }: AppContext): Promise<Boolean> {
        return new Promise((resolve) =>
            req.session!.destroy((err) => {
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                res.clearCookie(COOKIE_NAME);
                resolve(true);
            })
        );
    }

    // TODO: Rewrite user search
    @Query(() => [User])
    async searchUser(
        @Arg("text") text: string,
        @Ctx() { req }: AppContext
    ): Promise<User[]> {
        if (text == ".") {
            return await getRepository(User).find({
                where: {
                    Id: Not(req.session.userId)
                }
            });
        }
        return !User.find({
            where: {
                Name: text
            }
        })
            ? User.find({ where: { Surname: text } })
            : User.find({ where: { Name: text } });
    }
}
