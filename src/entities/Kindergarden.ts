import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Children } from "./Children";
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

  @Field(() => String)
  @Column()
  Address!: string;

  @Field(() => String)
  @Column()
  City!: string;

  @Field()
  @Column()
  Zipcode!: number;

  @Column()
  owningId: number;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.ownerOf, {
    nullable: true,
    lazy: true,
  })
  owning: User;

  @Field(() => [Groups], { nullable: true })
  @OneToMany(() => Groups, (groups) => groups.inKindergarden, {
    nullable: true,
    lazy: true,
  })
  groups: Groups[];

  @OneToMany(() => Children, (children) => children.inKindergarden, {
    lazy: true,
  })
  children: Children[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.partof, { lazy: true })
  staff: User[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date;
}
