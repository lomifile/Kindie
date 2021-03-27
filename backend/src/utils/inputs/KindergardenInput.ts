import { Field, InputType } from "type-graphql";

@InputType()
export class KinderGardenInput {
  @Field()
  name: string;

  @Field()
  city: string;

  @Field()
  address: string;

  @Field()
  Zipcode: number;
}
