import { Field, InputType } from "type-graphql";

@InputType()
export class KinderGardenInput {
  @Field()
  name: string;
}
