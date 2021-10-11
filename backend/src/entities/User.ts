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
import { KinderGarden } from "./Kindergarden";
import { Mother } from "./Mother";
import { Father } from "./Father";
import { StaffMembers } from "./SatffMembers";

@ObjectType()
@Entity()
export class User extends BaseEntity {
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
  @Column({ unique: true })
  Email!: string;

  @Field(() => String)
  @Column()
  Role!: string;

  @Field(() => [KinderGarden])
  @OneToMany(() => KinderGarden, (kindergarden) => kindergarden.owning, {
    nullable: true,
    lazy: true,
  })
  ownerOf: KinderGarden[];

  @Field(() => [StaffMembers], { nullable: true })
  @OneToMany(() => StaffMembers, (staff) => staff.staff, {
    lazy: true,
    nullable: true,
  })
  staffOf: StaffMembers[];

  @Column()
  Password!: string;

  @Column({ nullable: true })
  confirmed: boolean;

  @Field(() => [Children], { nullable: true })
  @OneToMany(() => Children, (children) => children.createdBy, {
    lazy: true,
    nullable: true,
  })
  createdChildren: Children[];

  @Field(() => [Children], { nullable: true })
  @OneToMany(() => Children, (children) => children.updatedBy, {
    lazy: true,
    nullable: true,
  })
  updatedChildren: Children[];

  @Field(() => [Mother], { nullable: true })
  @OneToMany(() => Mother, (mother) => mother.createdBy, {
    lazy: true,
    nullable: true,
  })
  createdMother: Mother[];

  @Field(() => [Mother], { nullable: true })
  @OneToMany(() => Mother, (mother) => mother.updatedBy, {
    lazy: true,
    nullable: true,
  })
  updatedMother: Mother[];

  @Field(() => [Father], { nullable: true })
  @OneToMany(() => Father, (father) => father.createdBy, {
    lazy: true,
    nullable: true,
  })
  createdFather: Father[];

  @Field(() => [Father], { nullable: true })
  @OneToMany(() => Father, (father) => father.updatedBy, {
    lazy: true,
    nullable: true,
  })
  updatedFather: Father[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
