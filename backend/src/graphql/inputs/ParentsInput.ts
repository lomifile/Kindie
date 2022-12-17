import { Field, InputType } from "type-graphql";

@InputType()
export class ParentsInput {
	@Field()
	name: string;

	@Field()
	surname: string;

	@Field()
	email: string;

	@Field()
	phone: number;
}
