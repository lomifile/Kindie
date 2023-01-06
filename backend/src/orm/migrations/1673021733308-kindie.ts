import {MigrationInterface, QueryRunner} from "typeorm";

export class kindie1673021733308 implements MigrationInterface {
    name = 'kindie1673021733308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "activity_log" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "action" json NOT NULL, "args" json NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_067d761e2956b77b14e534fd6f1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "activity_log"`);
    }

}
