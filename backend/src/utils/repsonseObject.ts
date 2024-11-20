import { ClassType, Field, ObjectType } from "type-graphql";
import { FieldError } from "./Errors";

export default function Response<TEntity extends Object>(
	TEntityObj: ClassType<TEntity>
) {
	@ObjectType()
	abstract class ResponseObject {
		@Field(() => [FieldError], { nullable: true })
		errors?: FieldError[];

		@Field(() => TEntityObj, { nullable: true })
		data?: TEntity;
	}

	return ResponseObject;
}
