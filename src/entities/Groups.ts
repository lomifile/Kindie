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
import { Children } from "./Children";
import { KinderGarden } from "./Kindergarden";

@ObjectType()
@Entity()
export class Groups extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  Id!: number;

  @Field(() => String)
  @Column()
  Name!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date;

  @ManyToOne(() => KinderGarden, (kindergarden) => kindergarden.groups)
  inKindergarden: KinderGarden;

  @OneToMany(() => Children, (children) => children.inGroup)
  children: Children[];
}
