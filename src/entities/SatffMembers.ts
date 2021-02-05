import { BaseEntity, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class StaffMembers extends BaseEntity {
  @PrimaryColumn("uuid")
  userId: number;

  @PrimaryColumn("uuid")
  kindergardenId: number;
}
