import { MigrationInterface, QueryRunner } from "typeorm";

export class kindie1673682476175 implements MigrationInterface {
	name = "kindie1673682476175";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`DROP INDEX "public"."user_document_weights_idx"`
		);
		await queryRunner.query(
			`ALTER TABLE "attendance" ADD "deletedAt" TIMESTAMP`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "attendance" DROP COLUMN "deletedAt"`
		);
		await queryRunner.query(
			`CREATE INDEX "user_document_weights_idx" ON "user" ("document_with_weights") `
		);
	}
}
