import { Field, ObjectType } from "type-graphql";
import { FieldError } from "./Errors";

export default function BooleanResponse() {
	@ObjectType()
	abstract class PaginatedResponseObject {
		@Field(() => Boolean, { nullable: true })
		result?: boolean;

		@Field(() => [FieldError], { nullable: true })
		errors?: FieldError[];
	}
	return PaginatedResponseObject;
}
