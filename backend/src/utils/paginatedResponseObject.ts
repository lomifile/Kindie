import { ClassType, Field, ObjectType } from "type-graphql";
import { FieldError } from "./Errors";

export default function PaginatedResponse<TPaginated extends Object>(
	TPaginatedObject: ClassType<TPaginated>
) {
	@ObjectType()
	abstract class PaginatedResponseObject {
		@Field(() => [TPaginatedObject], { nullable: true })
		data?: TPaginated[];

		@Field(() => [FieldError], { nullable: true })
		errors?: FieldError[];

		@Field()
		hasMore?: boolean;
	}
	return PaginatedResponseObject;
}
