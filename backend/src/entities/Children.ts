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
import { KinderGarden } from "./Kindergarden";
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

  @Field(() => String, { nullable: true })
  @Column({ type: "date", nullable: true })
  BirthDate!: Date;

  @Field()
  @Column({ type: "bigint" })
  OIB!: number;

  @Field(() => String)
  @Column()
  Remarks: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  motherId: number;

  @Column({ nullable: true })
  fatherId: number;

  @Column({ nullable: true })
  inGroupId: number;

  @Column({ nullable: true })
  inKindergardenId: number;

  @ManyToOne(() => KinderGarden, (kindergarden) => kindergarden.children, {
    lazy: true,
  })
  inKindergarden: KinderGarden;

  @Field(() => Groups, { nullable: true })
  @ManyToOne(() => Groups, (groups) => groups.children, {
    nullable: true,
    lazy: true,
  })
  inGroup: Groups;

  @Field(() => Mother, { nullable: true })
  @ManyToOne(() => Mother, (mother) => mother.children, {
    nullable: true,
    lazy: true,
  })
  mother: Mother;

  @Field(() => Father, { nullable: true })
  @ManyToOne(() => Father, (father) => father.children, {
    nullable: true,
    lazy: true,
  })
  father: Father;
}
