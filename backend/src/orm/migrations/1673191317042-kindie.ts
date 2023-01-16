import { MigrationInterface, QueryRunner } from "typeorm";

export class kindie1673191317042 implements MigrationInterface {
	name = "kindie1673191317042";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "staff_members" ADD "archived" TIMESTAMP`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "staff_members" DROP COLUMN "archived"`
		);
	}
}
