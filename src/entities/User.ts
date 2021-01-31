import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { KinderGarden } from "./Kindergarden";

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

  @ManyToOne(() => KinderGarden, (kindergarden) => kindergarden.owning, {
    nullable: true,
  })
  ownerOf: KinderGarden[];

  @Column()
  Password!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date;
}
