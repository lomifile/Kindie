import { ClassType, Field, ObjectType } from "type-graphql";

export default function PaginatedResponse<TPaginated>(
  TPaginatedObject: ClassType<TPaginated>
) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseObject {
    @Field(() => [TPaginatedObject], { nullable: true })
    data?: TPaginated;

    @Field()
    hasMore?: boolean;
  }
  return PaginatedResponseObject;
}
