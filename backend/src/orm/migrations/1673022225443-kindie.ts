import {MigrationInterface, QueryRunner} from "typeorm";

export class kindie1673022225443 implements MigrationInterface {
    name = 'kindie1673022225443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity_log" ADD "kindergardenId" integer`);
        await queryRunner.query(`ALTER TABLE "activity_log" ADD "groupId" integer`);
        await queryRunner.query(`ALTER TABLE "activity_log" ALTER COLUMN "userId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity_log" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity_log" DROP COLUMN "groupId"`);
        await queryRunner.query(`ALTER TABLE "activity_log" DROP COLUMN "kindergardenId"`);
    }

}
