import { MigrationInterface, QueryRunner } from "typeorm";

export class TriggerScript1671279219493 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        update public.children
        set document_with_weights = setweight(to_tsvector("Name"), 'A') || setweight(to_tsvector("Surname"), 'B');
        CREATE INDEX children_document_weights_idx ON public.children USING GIN (document_with_weights);
        CREATE FUNCTION children_tsvector_trigger() RETURNS trigger AS $$ begin new.document_with_weights := setweight(
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
        UPDATE ON public.children FOR EACH ROW EXECUTE PROCEDURE children_tsvector_trigger();
        `);
		await queryRunner.query(`
        update public.mother
        set document_with_weights = setweight(to_tsvector("Name"), 'A') || setweight(to_tsvector("Surname"), 'B');
        CREATE INDEX mother_document_weights_idx ON public.mother USING GIN (document_with_weights);
        CREATE FUNCTION mother_tsvector_trigger() RETURNS trigger AS $$ begin new.document_with_weights := setweight(
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
        UPDATE ON public.mother FOR EACH ROW EXECUTE PROCEDURE mother_tsvector_trigger();
        `);
		await queryRunner.query(`
        update public.father
        set document_with_weights = setweight(to_tsvector("Name"), 'A') || setweight(to_tsvector("Surname"), 'B');
        CREATE INDEX father_document_weights_idx ON public.mother USING GIN (document_with_weights);
        CREATE FUNCTION father_tsvector_trigger() RETURNS trigger AS $$ begin new.document_with_weights := setweight(
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
        UPDATE ON public.father FOR EACH ROW EXECUTE PROCEDURE father_tsvector_trigger();
        `);
	}

	public async down(): Promise<void> {
		//
	}
}
