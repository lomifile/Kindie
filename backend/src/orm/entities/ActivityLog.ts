import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn
} from "typeorm";

@Entity("activity_log")
@ObjectType()
export class ActivityLog extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field()
	id: number;

	@Column({ nullable: true })
	@Field({ nullable: true })
	userId: number;

	@Column({ nullable: true })
	@Field({ nullable: true })
	kindergardenId: number;

	@Column({ nullable: true })
	@Field({ nullable: true })
	groupId: number;

	@Column({ type: "json" })
	@Field(() => Object)
	action: object;

	@Column({ type: "json" })
	@Field(() => Object)
	args: object;

	@CreateDateColumn()
	@Field()
	createdAt: Date;
}
