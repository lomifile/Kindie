import {MigrationInterface, QueryRunner} from "typeorm";

export class kindie1633940218122 implements MigrationInterface {
    name = 'kindie1633940218122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."staff_members" DROP CONSTRAINT "PK_b5bcfa806647fc5497ee22529a8"`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" ADD CONSTRAINT "PK_49a3a8f84a9909ce1c6a2d8d13f" PRIMARY KEY ("kindergardenId")`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" DROP CONSTRAINT "PK_49a3a8f84a9909ce1c6a2d8d13f"`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" ADD CONSTRAINT "PK_30139c97b810884462f6a112cd3" PRIMARY KEY ("staffId", "kindergardenId")`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" DROP CONSTRAINT "FK_7346f3b32358cbb87486fd1b191"`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" ALTER COLUMN "staffId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" ADD CONSTRAINT "FK_7346f3b32358cbb87486fd1b191" FOREIGN KEY ("staffId") REFERENCES "user"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."staff_members" DROP CONSTRAINT "FK_7346f3b32358cbb87486fd1b191"`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" ALTER COLUMN "staffId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" ADD CONSTRAINT "FK_7346f3b32358cbb87486fd1b191" FOREIGN KEY ("staffId") REFERENCES "user"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" DROP CONSTRAINT "PK_30139c97b810884462f6a112cd3"`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" ADD CONSTRAINT "PK_49a3a8f84a9909ce1c6a2d8d13f" PRIMARY KEY ("kindergardenId")`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" DROP CONSTRAINT "PK_49a3a8f84a9909ce1c6a2d8d13f"`);
        await queryRunner.query(`ALTER TABLE "public"."staff_members" ADD CONSTRAINT "PK_b5bcfa806647fc5497ee22529a8" PRIMARY KEY ("userId", "kindergardenId")`);
    }

}
