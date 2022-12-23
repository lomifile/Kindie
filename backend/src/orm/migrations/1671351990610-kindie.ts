import {MigrationInterface, QueryRunner} from "typeorm";

export class kindie1671351990610 implements MigrationInterface {
    name = 'kindie1671351990610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."mother_document_weights_idx"`);
        await queryRunner.query(`DROP INDEX "public"."father_document_weights_idx"`);
        await queryRunner.query(`DROP INDEX "public"."children_document_weights_idx"`);
        await queryRunner.query(`ALTER TABLE "kinder_garden" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "children" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "children" ALTER COLUMN "document_with_weights" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "children" ALTER COLUMN "document_with_weights" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "children" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "kinder_garden" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`CREATE INDEX "children_document_weights_idx" ON "children" ("document_with_weights") `);
        await queryRunner.query(`CREATE INDEX "father_document_weights_idx" ON "mother" ("document_with_weights") `);
        await queryRunner.query(`CREATE INDEX "mother_document_weights_idx" ON "mother" ("document_with_weights") `);
    }

}
