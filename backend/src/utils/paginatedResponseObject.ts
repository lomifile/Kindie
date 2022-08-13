import { ClassType, Field, ObjectType } from "type-graphql";
import { FieldError } from "./Errors";

export default function PaginatedResponse<TPaginated>(
  TPaginatedObject: ClassType<TPaginated>
) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseObject {
    @Field(() => [TPaginatedObject], { nullable: true })
    data?: TPaginated;

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field()
    hasMore?: boolean;
  }
  return PaginatedResponseObject;
}
