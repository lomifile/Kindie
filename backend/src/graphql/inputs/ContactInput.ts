import { Field, InputType } from "type-graphql";

@InputType()
export class ContactInput {
	@Field()
	email!: string;

	@Field()
	subject: string;

	@Field()
	message: string;
}
