import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { Attendance } from "./Attendance";
import { Father } from "./Father";
import { Groups } from "./Groups";
import { KinderGarden } from "./Kindergarden";
import { Mother } from "./Mother";
import { User } from "./User";

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

	@Field(() => Date, { nullable: true })
	@Column({ nullable: true })
	BirthDate!: Date;

	@Field()
	@Column({ type: "bigint" })
	OIB!: number;

	@Field(() => String)
	@Column()
	Remarks: string;

	@Field(() => Date)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt: Date;

	@Field(() => Date)
	@DeleteDateColumn()
	deletedAt: Date;

	@Field({ nullable: true })
	@Column({ nullable: true })
	motherId: number;

	@Field({ nullable: true })
	@Column({ nullable: true })
	fatherId: number;

	@Column({ nullable: true })
	inGroupId: number | null;

	@Column({ nullable: true })
	inKindergardenId: number;

	@Field({ nullable: true })
	@Column({ nullable: true })
	createdById: number;

	@Field({ nullable: true })
	@Column({ nullable: true })
	updatedById: number;

	@ManyToOne(() => KinderGarden, (kindergarden) => kindergarden.children, {
		lazy: true
	})
	inKindergarden: KinderGarden;

	@Field(() => Groups, { nullable: true })
	@ManyToOne(() => Groups, (groups) => groups.children, {
		nullable: true,
		lazy: true
	})
	inGroup: Groups;

	@Field(() => Mother, { nullable: true })
	@ManyToOne(() => Mother, (mother) => mother.children, {
		nullable: true,
		lazy: true,
		onDelete: "CASCADE",
		onUpdate: "CASCADE"
	})
	mother: Mother;

	@Field(() => Father, { nullable: true })
	@ManyToOne(() => Father, (father) => father.children, {
		nullable: true,
		lazy: true,
		onDelete: "CASCADE",
		onUpdate: "CASCADE"
	})
	father: Father;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, (user) => user.createdChildren, {
		lazy: true,
		nullable: true
	})
	createdBy: User;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, (user) => user.createdChildren, {
		lazy: true,
		nullable: true
	})
	updatedBy: User;

	@OneToMany(() => Attendance, (attendance) => attendance.Id, { lazy: true })
	attendance: Attendance[];

	@Column("tsvector", { select: false, nullable: true })
	document_with_weights: unknown;
}
