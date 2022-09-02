import { ClassType, Field, ObjectType } from "type-graphql";

import { FieldError } from "./Errors";

export default function Response<TEntity>(
  TEntityObj: ClassType<TEntity> | ClassType<TEntity[]>
) {
  @ObjectType({ isAbstract: true })
  abstract class ResponseObject {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => TEntityObj, { nullable: true })
    data?: TEntity;
  }

  return ResponseObject;
}
