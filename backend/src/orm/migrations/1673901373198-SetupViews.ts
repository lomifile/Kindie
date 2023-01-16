import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupViews1673901373198 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            create or replace view v_children as 
            select 
                c."Id"
                , c."Name"
                , c."Surname"
                , c."Gender"
                , c."BirthDate"
                , c."OIB"
                , c."Remarks"
                , c."createdAt"
                , c."updatedAt"
                , c."motherId"
                , c."fatherId"
                , c."inGroupId"
                , c."inKindergardenId"
                , c."createdById"
                , c."updatedById"
            from children c
            inner join public."kinder_garden" k 
            on k."Id" = c."inKindergardenId";
        `);
	}

	public async down(): Promise<void> {
		//
	}
}
