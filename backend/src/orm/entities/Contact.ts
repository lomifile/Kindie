import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Contact extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  Id: number;

  @Field(() => String)
  @Column()
  Email!: string;

  @Field(() => String)
  @Column()
  Subject!: string;

  @Field(() => String)
  @Column()
  Message!: string;
}
