import { MigrationInterface, QueryRunner } from "typeorm";

export class kindie1673419634748 implements MigrationInterface {
	name = "kindie1673419634748";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" ADD "document_with_weights" tsvector`
		);
		await queryRunner.query(`
        update public.user
        set document_with_weights = setweight(to_tsvector("Name"), 'A') || setweight(to_tsvector("Surname"), 'B');
        CREATE INDEX user_document_weights_idx ON public.user USING GIN (document_with_weights);
        CREATE FUNCTION user_tsvector_trigger() RETURNS trigger AS $$ begin new.document_with_weights := setweight(
          to_tsvector('english', coalesce(new."Name", '')),
          'A'
        ) || setweight(
          to_tsvector('english', coalesce(new."Surname", '')),
          'B'
        ); 
        return new;
        end $$ LANGUAGE plpgsql;
        CREATE TRIGGER tsvectorupdate BEFORE
        INSERT
          OR
        UPDATE ON public.user FOR EACH ROW EXECUTE PROCEDURE user_tsvector_trigger();
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" DROP COLUMN "document_with_weights"`
		);
	}
}
