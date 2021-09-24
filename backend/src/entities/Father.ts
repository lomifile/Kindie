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
import { User } from "./User";

@ObjectType()
@Entity()
export class Father extends BaseEntity {
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

  @Column({ nullable: true })
  createdById: number;

  @Column({ nullable: true })
  updatedById: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Children, (children) => children.father, {
    nullable: true,
    lazy: true,
  })
  children: Children[];

  @ManyToOne(() => KinderGarden, (kindergarden) => kindergarden.Father, {
    nullable: true,
    lazy: true,
  })
  inKindergarden: KinderGarden;

  @ManyToOne(() => User, (user) => user.createdFather, {
    lazy: true,
  })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.updatedFather, {
    lazy: true,
  })
  updatedBy: User;

  @Column({ nullable: true })
  inKindergardenId: number;
}
