import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Groups } from "./Groups";
import { User } from "./User";

@ObjectType()
@Entity()
export class KinderGarden extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  Id!: number;

  @Field(() => String)
  @Column()
  Name!: string;

  @OneToOne(() => User, (user) => user.ownerOf, { nullable: true })
  owning: User;

  @OneToMany(() => Groups, (groups) => groups.inKindergarden, {
    nullable: true,
  })
  groups: Groups[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date;
}
