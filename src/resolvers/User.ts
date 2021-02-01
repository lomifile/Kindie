import { User } from "../entities/User";
import { AppContext } from "src/Types";
import {
  UpdatePassword,
  UpdateUserInput,
  UsernamePasswordInput,
} from "../utils/inputs/UserInput";
import { ValidateRegister } from "../utils/ValidateRegister";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import argon2 from "argon2";
import {
  ACCOUNT_VERIFICATION_PREFIX,
  COOKIE_NAME,
  FORGET_PASSWORD_PREFIX,
} from "../Constants";
import { sendMail } from "../utils/SendEmail";
import { v4 } from "uuid";
import { isAuth } from "../middleware/isAuth";

@ObjectType()
class UserFieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [UserFieldError], { nullable: true })
  errors?: UserFieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  async updatePassword(
    @Arg("options") options: UpdatePassword,
    @Ctx() { req }: AppContext
  ): Promise<UserResponse> {
    const hashPassword = await argon2.hash(options.password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({
          Password: hashPassword,
        })
        .where("Id=:id", { id: req.session.userId })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "email",
              message: "Email already taken",
            },
          ],
        };
      }
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  async update(
    @Arg("options") options: UpdateUserInput,
    @Ctx() { req }: AppContext
  ): Promise<UserResponse> {
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({
          Name: options.name,
          Surname: options.surname,
          Email: options.email,
        })
        .where("Id=:id", { id: req.session.userId })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "email",
              message: "Email already taken",
            },
          ],
        };
      }
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: AppContext
  ): Promise<UserResponse> {
    const key = FORGET_PASSWORD_PREFIX + token;
    const userID = await redis.get(key);

    if (!userID) {
      return {
        errors: [
          {
            field: "token",
            message: "Token expired",
          },
        ],
      };
    }

    const userid = parseInt(userID);
    const userData = await User.findOne(userid);

    if (!userData) {
      return {
        errors: [
          {
            field: "token",
            message: "User no longer exists",
          },
        ],
      };
    }

    await User.update(
      { Id: userid },
      {
        Password: await argon2.hash(newPassword),
      }
    );

    await redis.del(key);

    req.session.userId = userData.Id;
    return {
      user: userData,
    };
  }

  @Mutation(() => Boolean)
  async forgetPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: AppContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return true;
    }

    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.Id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    );

    await sendMail(
      email,
      "Change password",
      `<a href="http://localhost:3000/change-password/${token}">Reset password</a>`
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
            message: "Email doesn't exist",
          },
        ],
      };
    } else if (!user.confirmed || user.confirmed === null) {
      return {
        errors: [
          {
            field: "confirmation",
            message:
              "Your account need verification! Please check your email for verification!",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.Password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Password you entered is not matching one in database",
          },
        ],
      };
    }

    req.session.userId = user.Id;

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req, redis }: AppContext
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
          Role: options.role,
          Password: hashPassword,
          confirmed: false,
        })
        .returning("*")
        .execute();
      // console.log(result);
      user = result.raw[0];

      const token = v4();
      await redis.set(
        ACCOUNT_VERIFICATION_PREFIX + token,
        user.Id,
        "ex",
        1000 * 60 * 60 * 24 * 3
      );

      await sendMail(
        options.email,
        "Verify account",
        `<a href="http://localhost:3000/change-password/${token}">Verify account</a>`
      ).catch(console.error);
    } catch (err) {
      // console.log(err);
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "email",
              message: "Email already taken",
            },
          ],
        };
      }
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async verifyAccount(
    @Arg("token") token: string,
    @Ctx() { redis, req }: AppContext
  ): Promise<UserResponse> {
    const key = ACCOUNT_VERIFICATION_PREFIX + token;
    const userID = await redis.get(key);

    if (!userID) {
      return {
        errors: [
          {
            field: "token",
            message: "Token expired",
          },
        ],
      };
    }

    const userId = parseInt(userID);
    const userData = await User.findOne(userId);

    if (!userData) {
      return {
        errors: [
          {
            field: "token",
            message: "User no longer exists",
          },
        ],
      };
    }

    await User.update(
      { Id: userId },
      {
        confirmed: true,
      }
    );

    await redis.del(key);
    req.session.userId = userData.Id;
    return {
      user: userData,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: AppContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
