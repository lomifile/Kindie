import { MigrationInterface, QueryRunner } from "typeorm";

export class kindie1673075655350 implements MigrationInterface {
	name = "kindie1673075655350";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" ADD "picture" text`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "picture"`);
	}
}
