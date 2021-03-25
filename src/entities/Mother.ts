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
export class Mother extends BaseEntity {
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
  Email!: string;

  @Field()
  @Column({ type: "bigint" })
  Phone: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Children, (children) => children.mother, {
    nullable: true,
    lazy: true,
  })
  children: Children[];

  @ManyToOne(() => KinderGarden, (kindergarden) => kindergarden.Mother, {
    nullable: true,
    lazy: true,
  })
  inKindergarden: KinderGarden;

  @Column({ nullable: true })
  inKindergardenId: number;
}
