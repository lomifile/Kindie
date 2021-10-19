import {MigrationInterface, QueryRunner} from "typeorm";

export class kindie1633940316896 implements MigrationInterface {
    name = 'kindie1633940316896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."staff_members" DROP CONSTRAINT "FK_f170a0899a455a93a2aefe1e9eb"`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" DROP COLUMN "kindergardenStaffId"`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" ADD CONSTRAINT "FK_49a3a8f84a9909ce1c6a2d8d13f" FOREIGN KEY ("kindergardenId") REFERENCES "kinder_garden"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."staff_members" DROP CONSTRAINT "FK_49a3a8f84a9909ce1c6a2d8d13f"`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" ADD "kindergardenStaffId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" ADD CONSTRAINT "FK_f170a0899a455a93a2aefe1e9eb" FOREIGN KEY ("kindergardenStaffId") REFERENCES "kinder_garden"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
