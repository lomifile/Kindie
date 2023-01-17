import {MigrationInterface, QueryRunner} from "typeorm";

export class kindie1673793708060 implements MigrationInterface {
    name = 'kindie1673793708060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" ADD "archived" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "archived"`);
    }

}
