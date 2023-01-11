import { Field, ObjectType } from "type-graphql";
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
import { Attendance } from "./Attendance";
import { Children } from "./Children";
import { Father } from "./Father";
import { Groups } from "./Groups";
import { Mother } from "./Mother";
import { StaffMembers } from "./StaffMembers";
import { User } from "./User";

@ObjectType()
@Entity()
export class KinderGarden extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	Id!: number;

	@Field(() => String)
	@Column()
	Name!: string;

	@Field(() => String)
	@Column()
	Address!: string;

	@Field(() => String)
	@Column()
	City!: string;

	@Field()
	@Column()
	Zipcode!: number;

	@Column()
	owningId: number;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, (user) => user.ownerOf, {
		nullable: true,
		lazy: true
	})
	owning?: User;

	@Field(() => [Groups], { nullable: true })
	@OneToMany(() => Groups, (groups) => groups.inKindergarden, {
		nullable: true,
		lazy: true
	})
	groups?: Groups[];

	@OneToMany(() => Children, (children) => children.inKindergarden, {
		lazy: true
	})
	children?: Children[];

	@OneToMany(() => Mother, (mother) => mother.inKindergarden, {
		lazy: true
	})
	Mother?: Mother[];

	@OneToMany(() => Father, (father) => father.inKindergarden, {
		lazy: true
	})
	Father?: Father[];

	@Field(() => [StaffMembers], { nullable: true })
	@OneToMany(() => StaffMembers, (staff) => staff.kindergarden, {
		lazy: true,
		nullable: true
	})
	staff?: StaffMembers[];

	@OneToMany(() => Attendance, (attendance) => attendance.Id)
	attendance?: Attendance[];

	@Field(() => String)
	@CreateDateColumn()
	createdAt?: Date;

	@Field(() => String)
	@DeleteDateColumn()
	deletedAt?: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt?: Date;
}
