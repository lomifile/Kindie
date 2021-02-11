import { BaseEntity, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class StaffMembers extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  kindergardenId: number;

  @CreateDateColumn()
  createdAt: Date;
}
