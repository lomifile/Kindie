import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Father } from "./Father";
import { Groups } from "./Groups";
import { Mother } from "./Mother";

@ObjectType()
@Entity()
export class Children extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  Id!: number;

  @Field(() => String)
  @Column()
  Name!: string;

  @Field(() => String)
  @Column()
  Surname!: string;

  @Field(() => String)
  @Column()
  Gender!: string;

  @Field(() => String)
  @Column()
  BirthDate!: Date;

  @Field()
  @Column()
  OIB!: number;

  @Field(() => String)
  @Column()
  Remarks: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date;

  @ManyToOne(() => Groups, (groups) => groups.children, { nullable: true })
  inGroup: Groups | number | null;

  @ManyToOne(() => Mother, (mother) => mother.children, { nullable: true })
  mother: Mother | number | null;

  @ManyToOne(() => Father, (father) => father.children, { nullable: true })
  father: Father | number | null;
}
