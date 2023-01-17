import { MigrationInterface, QueryRunner } from "typeorm";

export class kindie1672166575005 implements MigrationInterface {
	name = "kindie1672166575005";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "mother" ALTER COLUMN "document_with_weights" DROP NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "mother" ALTER COLUMN "document_with_weights" SET NOT NULL`
		);
	}
}
