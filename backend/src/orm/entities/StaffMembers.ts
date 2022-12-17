import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn
} from "typeorm";
import { KinderGarden } from "./Kindergarden";
import { User } from "./User";

@ObjectType()
@Entity()
export class StaffMembers extends BaseEntity {
	@Field()
	@PrimaryColumn()
	staffId!: number;

	@Field()
	@PrimaryColumn()
	kindergardenId: number;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, (user) => user.staffOf, {
		lazy: true,
		nullable: true
	})
	staff: User;

	@Field(() => KinderGarden, { nullable: true })
	@ManyToOne(() => KinderGarden, (kindergarden) => kindergarden.staff, {
		lazy: true,
		nullable: true
	})
	kindergarden: KinderGarden;

	@Field(() => String)
	@Column()
	role!: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
