import { User } from "../entities/User";
import { AppContext } from "src/Types";
import { UsernamePasswordInput } from "../utils/inputs/UserInput";
import { ValidateRegister } from "../utils/ValidateRegister";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import argon2 from "argon2";

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
    @Ctx() { req }: AppContext
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
        })
        .returning("*")
        .execute();
      // console.log(result);
      user = result.raw[0];
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
}
