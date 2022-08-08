import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Children } from "./Children";
import { Groups } from "./Groups";
import { KinderGarden } from "./Kindergarden";

@ObjectType()
@Entity()
export class Attendance extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  Id!: number;

  @OneToMany(() => Children, (children) => children.Id)
  child: Children[];

  @OneToMany(() => KinderGarden, (kindergarden) => kindergarden.Id)
  kindergarden: KinderGarden[];

  @OneToMany(() => Groups, (groups) => groups.Id)
  groups: Groups[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  childId!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  groupId!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  kindergardenId!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  attendance?: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
