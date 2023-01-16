import { MigrationInterface, QueryRunner } from "typeorm";

export class kindie1672166769647 implements MigrationInterface {
	name = "kindie1672166769647";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "mother" ALTER COLUMN "archived" DROP NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "mother" ALTER COLUMN "archived" SET NOT NULL`
		);
	}
}
