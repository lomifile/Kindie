import { MigrationInterface, QueryRunner } from "typeorm";

export class kindie1672211830949 implements MigrationInterface {
	name = "kindie1672211830949";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "father" ALTER COLUMN "document_with_weights" DROP NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "father" ALTER COLUMN "archived" DROP NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "father" ALTER COLUMN "archived" SET NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "father" ALTER COLUMN "document_with_weights" SET NOT NULL`
		);
	}
}
