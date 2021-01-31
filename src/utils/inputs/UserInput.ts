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
  password: string;
  @Field()
  role: string;
}
