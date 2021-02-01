import { Groups } from "../entities/Groups";
import {
  Field,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";

@ObjectType()
class GroupsFieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class GroupsResponse {
  @Field(() => [GroupsFieldError], { nullable: true })
  errors?: GroupsFieldError[];

  @Field(() => Groups, { nullable: true })
  groups?: Groups;
}

@Resolver(Groups)
export class GroupsResolver {}
