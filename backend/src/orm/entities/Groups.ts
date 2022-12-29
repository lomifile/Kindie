import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Attendance } from "./Attendance";
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
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	@Column()
	inKindergardenId: number;

	@Field(() => KinderGarden, { nullable: true })
	@ManyToOne(() => KinderGarden, (kindergarden) => kindergarden.groups, {
		lazy: true
	})
	inKindergarden: KinderGarden;

	@Field(() => [Children], { nullable: true })
	@OneToMany(() => Children, (children) => children.inGroup, {
		nullable: true,
		lazy: true
	})
	children: Children[];

	@OneToMany(() => Attendance, (attendance) => attendance.Id)
	attendance: Attendance[];
}
