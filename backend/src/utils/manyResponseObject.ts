import { ClassType, Field, ObjectType } from "type-graphql";
import { FieldError } from "./Errors";

export default function ManyResponse<TEntity extends Object>(
	TEntity: ClassType<TEntity>
) {
	@ObjectType()
	abstract class ManyResponseObject {
		@Field(() => [TEntity], { nullable: true })
		data?: TEntity[];

		@Field(() => [FieldError], { nullable: true })
		errors?: FieldError[];
	}
	return ManyResponseObject;
}
