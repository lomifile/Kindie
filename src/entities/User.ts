import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
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

  @Field(() => [KinderGarden])
  @OneToMany(() => KinderGarden, (kindergarden) => kindergarden.owning, {
    nullable: true,
    lazy: true,
  })
  ownerOf: KinderGarden[];

  @ManyToMany(() => KinderGarden, (kindergarden) => kindergarden.staff, {
    lazy: true,
    nullable: true,
  })
  @JoinTable({
    name: "staff_members",
    joinColumn: {
      name: "userId",
      referencedColumnName: "Id",
    },
    inverseJoinColumn: {
      name: "kindergardenId",
      referencedColumnName: "Id",
    },
  })
  @Field(() => [KinderGarden])
  partof: KinderGarden[];

  @Column()
  Password!: string;

  @Column({ nullable: true })
  confirmed: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date;
}
