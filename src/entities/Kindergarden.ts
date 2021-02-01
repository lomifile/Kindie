import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @Field(() => String)
  @Column()
  Address!: string;

  @Field(() => String)
  @Column()
  City!: string;

  @Field()
  @Column()
  Zipcode!: number;

  @ManyToOne(() => User, (user) => user.ownerOf)
  owning: User | number;

  @OneToMany(() => Groups, (groups) => groups.inKindergarden, {
    nullable: true,
  })
  groups: Groups[] | string[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date;
}
