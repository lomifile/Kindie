import {MigrationInterface, QueryRunner} from "typeorm";

export class kindie1633940630871 implements MigrationInterface {
    name = 'kindie1633940630871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."staff_members" ADD "role" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."staff_members" DROP COLUMN "role"`);
    }

}
