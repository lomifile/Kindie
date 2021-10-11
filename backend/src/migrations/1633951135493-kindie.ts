import {MigrationInterface, QueryRunner} from "typeorm";

export class kindie1633951135493 implements MigrationInterface {
    name = 'kindie1633951135493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "Role"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "Role" character varying NOT NULL`);
    }

}
