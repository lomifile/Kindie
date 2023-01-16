import { User } from "@orm/entities";
import {
	UpdatePassword,
	UpdateUserInput,
	UsernamePasswordInput
} from "@graphql/inputs";
import {
	ValidateRegister,
	validateForgotPassword,
	validateLogin,
	validateUpdatePassword,
	validateUpdateUser,
	validateResendEmail
} from "@graphql/validators";
import {
	Arg,
	Ctx,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";
import argon2 from "argon2";
import {
	ACCOUNT_VERIFICATION_PREFIX,
	COOKIE_NAME,
	FORGET_PASSWORD_PREFIX
} from "@root/constants";
import { sendMail, VerifyEmailTemplate } from "@utils/SendEmail";
import { v4 } from "uuid";
import { isAuth } from "@middleware/index";
import { LogAction } from "@middleware/LogAction";
import Response from "@utils/repsonseObject";
import { logger } from "@root/libs/winston";
import BooleanResponse from "@utils/booleanResponseObject";

@ObjectType()
class UserResponse extends Response<User>(User) {}

@ObjectType()
class UserBooleanResponse extends BooleanResponse() {}

@Resolver(User)
export class UserResolver {
	@Mutation(() => UserResponse)
	@UseMiddleware(isAuth, LogAction)
	async addProfilePicture(
		@Arg("picture", () => String) picture: string,
		@Ctx() { req }: AppContext
	): Promise<UserResponse> {
		let data;
		try {
			// TODO: Write validator
			if (picture.length === 0 || !picture)
				return {
					errors: [
						{
							field: "picture",
							message: "Picture arg cannot be empty"
						}
					]
				};
			const response = await getConnection()
				.createQueryBuilder()
				.update(User)
				.set({
					picture
				})
				.where("Id = :id", { id: req.session.userId })
				.returning("*")
				.execute();
			data = response.raw[0];
		} catch (err) {
			return {
				errors: [
					{
						field: err.name,
						message: err.message
					}
				]
			};
		}
		return {
			data
		};
	}

	// TODO: Figure out if this is needed
	@Query(() => [User])
	@UseMiddleware(isAuth, LogAction)
	async staffOf(@Ctx() { req }: AppContext): Promise<User[]> {
		return await User.find({
			where: { Id: req.session.userId },
			relations: ["staffOf"]
		});
	}

	@Mutation(() => UserResponse)
	@UseMiddleware(isAuth, LogAction)
	async updatePassword(
		@Arg("options") options: UpdatePassword,
		@Ctx() { req }: AppContext
	): Promise<UserResponse> {
		let data;
		try {
			const errors = validateUpdatePassword(options);
			if (errors) {
				return { errors };
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
			data = result.raw[0];
			req.session.userId = data.id;
		} catch (err) {
			return {
				errors: [
					{
						field: err.name,
						message: err.message
					}
				]
			};
		}
		return {
			data
		};
	}

	@Mutation(() => UserResponse)
	@UseMiddleware(isAuth, LogAction)
	async updateUser(
		@Arg("options") options: UpdateUserInput,
		@Ctx() { req }: AppContext
	): Promise<UserResponse> {
		let data;
		try {
			const errors = await validateUpdateUser(options);
			if (errors) {
				return { errors };
			}

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
			data = result.raw[0];
		} catch (err) {
			return {
				errors: [
					{
						field: err.name,
						message: err.message
					}
				]
			};
		}
		return { data };
	}

	@Mutation(() => UserResponse)
	async changePassword(
		@Arg("token") token: string,
		@Arg("newPassword") newPassword: string,
		@Arg("repeatNewPassword") repeatNewPassword: string,
		@Ctx() { redis }: AppContext
	): Promise<UserResponse> {
		let data;
		try {
			const key = FORGET_PASSWORD_PREFIX + token;
			const userId = await redis.get(key);
			if (!userId) {
				return {
					errors: [
						{
							field: "token",
							message: "Token expired"
						}
					]
				};
			}
			const userData = await User.findOne(parseInt(userId));

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
							field: "repeatPassword",
							message: "Passwords don't match"
						}
					]
				};
			}
			const result = await User.update(
				{ Id: userData.Id },
				{
					Password: await argon2.hash(newPassword)
				}
			);
			data = result.raw[0];
			await redis.del(key);
		} catch (err) {
			return {
				errors: [
					{
						field: err.name,
						message: err.message
					}
				]
			};
		}

		return {
			data
		};
	}

	@Mutation(() => UserBooleanResponse)
	@UseMiddleware(LogAction)
	async forgetPassword(
		@Arg("email") email: string,
		@Ctx() { redis }: AppContext
	): Promise<UserBooleanResponse> {
		try {
			const user = await User.findOne({ where: { Email: email } });
			const errors = validateForgotPassword(email, user);
			if (errors) {
				return {
					result: false,
					errors
				};
			}
			const token = v4();
			await redis.set(
				FORGET_PASSWORD_PREFIX + token,
				user!.Id,
				"EX",
				1000 * 60 * 60 * 24 * 3
			);

			await sendMail(
				email,
				"Change password",
				`<a href="${process.env.CORS_ORIGIN}/change-password/${token}">Reset password</a>`
			).catch((err) => {
				logger.error(err);
			});
		} catch (err) {
			return {
				errors: [
					{
						field: err.name,
						message: err.message
					}
				]
			};
		}
		return {
			result: true
		};
	}

	@Query(() => UserResponse, { nullable: true })
	@UseMiddleware(isAuth, LogAction)
	async me(@Ctx() { req }: AppContext): Promise<UserResponse> {
		let data;
		try {
			data = await User.findOneOrFail(req.session.userId);
		} catch (err) {
			return {
				errors: [
					{
						field: err.name,
						message: err.message
					}
				]
			};
		}
		return { data };
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Ctx() { req }: AppContext
	): Promise<UserResponse> {
		let data;
		try {
			const user = await User.findOne({ where: { Email: email } });
			const errors = await validateLogin({ email, password }, user);
			if (errors) {
				return { errors };
			}
			data = user;
			req.session.userId = user?.Id;
		} catch (err) {
			return {
				errors: [
					{
						field: err.name,
						message: err.message
					}
				]
			};
		}
		return {
			data
		};
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg("options") options: UsernamePasswordInput,
		@Ctx() { redis }: AppContext
	): Promise<UserResponse> {
		let data;
		try {
			const errors = ValidateRegister(options);
			if (errors) {
				return { errors };
			}
			const hashPassword = await argon2.hash(options.password);
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
			data = result.raw[0];

			const token = v4();
			await redis.set(
				ACCOUNT_VERIFICATION_PREFIX + token,
				data.Id,
				"EX",
				1000 * 60 * 60 * 24 * 3
			);

			await sendMail(
				options.email,
				"Verify account",
				VerifyEmailTemplate(token)
			).catch((err) => {
				logger.error(err);
			});
		} catch (err) {
			return {
				errors: [
					{
						field: err.name,
						message: err.message
					}
				]
			};
		}
		return { data };
	}

	@Mutation(() => UserBooleanResponse)
	@UseMiddleware(LogAction)
	async resendEmail(
		@Arg("email") email: string,
		@Ctx() { redis }: AppContext
	): Promise<UserBooleanResponse> {
		try {
			const user = await User.findOne({
				where: {
					Email: email
				}
			});

			const errors = validateResendEmail(email, user);
			if (errors) {
				return {
					result: false,
					errors
				};
			}

			const token = v4();
			await redis.set(
				ACCOUNT_VERIFICATION_PREFIX + token,
				user!.Id,
				"EX",
				1000 * 60 * 60 * 24 * 3
			);

			await sendMail(
				email,
				"Verify account",
				VerifyEmailTemplate(token)
			).catch((err) => {
				logger.error(err);
			});
		} catch (err) {
			return {
				result: false,
				errors: [
					{
						field: err.name,
						message: err.message
					}
				]
			};
		}
		return {
			result: true
		};
	}

	@Mutation(() => UserResponse)
	@UseMiddleware(LogAction)
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
			data: userData
		};
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth, LogAction)
	async logout(@Ctx() { req, res }: AppContext): Promise<boolean> {
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
	// @Query(() => [User])
	// @UseMiddleware(isAuth, LogAction)
	// async searchUser(
	// 	@Arg("text") text: string,
	// 	@Ctx() { req }: AppContext
	// ): Promise<User[]> {
	// 	if (text == ".") {
	// 		return await getRepository(User).find({
	// 			where: {
	// 				Id: Not(req.session.userId)
	// 			}
	// 		});
	// 	}
	// 	return !User.find({
	// 		where: {
	// 			Name: text
	// 		}
	// 	})
	// 		? User.find({ where: { Surname: text } })
	// 		: User.find({ where: { Name: text } });
	// }
}
