import { Field, InputType } from "type-graphql";

@InputType()
export class UsernamePasswordInput {
  @Field()
  name: string;
  @Field()
  surname: string;
  @Field()
  email: string;
  @Field()
  repeatPassword: string;
  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  name: string;
  @Field()
  surname: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
export class UpdatePassword {
  @Field()
  password: string;
  @Field()
  repeatPassword: string;
}
