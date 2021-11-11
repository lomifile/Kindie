import {MigrationInterface, QueryRunner} from "typeorm";

export class kindie1636379602712 implements MigrationInterface {
    name = 'kindie1636379602712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "groups" ("Id" SERIAL NOT NULL, "Name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "inKindergardenId" integer, CONSTRAINT "PK_ead72cb50d6187bb22433cdb6d4" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "staff_members" ("staffId" integer NOT NULL, "kindergardenId" integer NOT NULL, "role" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30139c97b810884462f6a112cd3" PRIMARY KEY ("staffId", "kindergardenId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("Id" SERIAL NOT NULL, "Name" character varying NOT NULL, "Surname" character varying NOT NULL, "Email" character varying NOT NULL, "Password" character varying NOT NULL, "confirmed" boolean, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b7eee57d84fb7ed872e660197fb" UNIQUE ("Email"), CONSTRAINT "PK_1e4be10b13490bd87f4cc30c142" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "mother" ("Id" SERIAL NOT NULL, "Name" character varying NOT NULL, "Surname" character varying NOT NULL, "Email" character varying NOT NULL, "Phone" bigint NOT NULL, "createdById" integer, "updatedById" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "inKindergardenId" integer, CONSTRAINT "PK_017e6f086592979b619184ac47d" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "kinder_garden" ("Id" SERIAL NOT NULL, "Name" character varying NOT NULL, "Address" character varying NOT NULL, "City" character varying NOT NULL, "Zipcode" integer NOT NULL, "owningId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0ced85781ac60168435c0a89e49" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "father" ("Id" SERIAL NOT NULL, "Name" character varying NOT NULL, "Surname" character varying NOT NULL, "Email" character varying NOT NULL, "Phone" bigint NOT NULL, "createdById" integer, "updatedById" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "inKindergardenId" integer, CONSTRAINT "PK_ea367477b96bebed20d6c0c5297" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "children" ("Id" SERIAL NOT NULL, "Name" character varying NOT NULL, "Surname" character varying NOT NULL, "Gender" character varying NOT NULL, "BirthDate" TIMESTAMP, "OIB" bigint NOT NULL, "Remarks" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "motherId" integer, "fatherId" integer, "inGroupId" integer, "inKindergardenId" integer, "createdById" integer, "updatedById" integer, CONSTRAINT "PK_81f6962899c06e93f4052404a4a" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "contact" ("Id" SERIAL NOT NULL, "Email" character varying NOT NULL, "Subject" character varying NOT NULL, "Message" character varying NOT NULL, CONSTRAINT "PK_1c9fb765d0e6bf4579b0dbb6094" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_1a30db249be9e4763dd0cd7bd91" FOREIGN KEY ("inKindergardenId") REFERENCES "kinder_garden"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_members" ADD CONSTRAINT "FK_7346f3b32358cbb87486fd1b191" FOREIGN KEY ("staffId") REFERENCES "user"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_members" ADD CONSTRAINT "FK_49a3a8f84a9909ce1c6a2d8d13f" FOREIGN KEY ("kindergardenId") REFERENCES "kinder_garden"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mother" ADD CONSTRAINT "FK_3d93b2160d232e3f2b10d178a1b" FOREIGN KEY ("inKindergardenId") REFERENCES "kinder_garden"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mother" ADD CONSTRAINT "FK_7d9182151b4d64e06a047baf53b" FOREIGN KEY ("createdById") REFERENCES "user"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mother" ADD CONSTRAINT "FK_26a99713eb5660f50deb6bf7e4c" FOREIGN KEY ("updatedById") REFERENCES "user"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kinder_garden" ADD CONSTRAINT "FK_e6678697487b6a7ef124b437848" FOREIGN KEY ("owningId") REFERENCES "user"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "father" ADD CONSTRAINT "FK_b0fab406a519e49fea460115ec5" FOREIGN KEY ("inKindergardenId") REFERENCES "kinder_garden"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "father" ADD CONSTRAINT "FK_d743fe161fd34a6af631d2398af" FOREIGN KEY ("createdById") REFERENCES "user"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "father" ADD CONSTRAINT "FK_6322b99b91dad9b600fbb7629ae" FOREIGN KEY ("updatedById") REFERENCES "user"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "children" ADD CONSTRAINT "FK_3b107826bae94cd6aa92a8a8e0e" FOREIGN KEY ("inKindergardenId") REFERENCES "kinder_garden"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "children" ADD CONSTRAINT "FK_2ef8dcdfd6a4c6930d6ff34a9e4" FOREIGN KEY ("inGroupId") REFERENCES "groups"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "children" ADD CONSTRAINT "FK_3209d6e4b254a919cd1ae397680" FOREIGN KEY ("motherId") REFERENCES "mother"("Id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "children" ADD CONSTRAINT "FK_273a4ebfe9ffcf6b4993f27f78d" FOREIGN KEY ("fatherId") REFERENCES "father"("Id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "children" ADD CONSTRAINT "FK_7266a5d62545eabd5d2debeeae9" FOREIGN KEY ("createdById") REFERENCES "user"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "children" ADD CONSTRAINT "FK_f68e0ce70aa69c1052566b922b7" FOREIGN KEY ("updatedById") REFERENCES "user"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "children" DROP CONSTRAINT "FK_f68e0ce70aa69c1052566b922b7"`);
        await queryRunner.query(`ALTER TABLE "children" DROP CONSTRAINT "FK_7266a5d62545eabd5d2debeeae9"`);
        await queryRunner.query(`ALTER TABLE "children" DROP CONSTRAINT "FK_273a4ebfe9ffcf6b4993f27f78d"`);
        await queryRunner.query(`ALTER TABLE "children" DROP CONSTRAINT "FK_3209d6e4b254a919cd1ae397680"`);
        await queryRunner.query(`ALTER TABLE "children" DROP CONSTRAINT "FK_2ef8dcdfd6a4c6930d6ff34a9e4"`);
        await queryRunner.query(`ALTER TABLE "children" DROP CONSTRAINT "FK_3b107826bae94cd6aa92a8a8e0e"`);
        await queryRunner.query(`ALTER TABLE "father" DROP CONSTRAINT "FK_6322b99b91dad9b600fbb7629ae"`);
        await queryRunner.query(`ALTER TABLE "father" DROP CONSTRAINT "FK_d743fe161fd34a6af631d2398af"`);
        await queryRunner.query(`ALTER TABLE "father" DROP CONSTRAINT "FK_b0fab406a519e49fea460115ec5"`);
        await queryRunner.query(`ALTER TABLE "kinder_garden" DROP CONSTRAINT "FK_e6678697487b6a7ef124b437848"`);
        await queryRunner.query(`ALTER TABLE "mother" DROP CONSTRAINT "FK_26a99713eb5660f50deb6bf7e4c"`);
        await queryRunner.query(`ALTER TABLE "mother" DROP CONSTRAINT "FK_7d9182151b4d64e06a047baf53b"`);
        await queryRunner.query(`ALTER TABLE "mother" DROP CONSTRAINT "FK_3d93b2160d232e3f2b10d178a1b"`);
        await queryRunner.query(`ALTER TABLE "staff_members" DROP CONSTRAINT "FK_49a3a8f84a9909ce1c6a2d8d13f"`);
        await queryRunner.query(`ALTER TABLE "staff_members" DROP CONSTRAINT "FK_7346f3b32358cbb87486fd1b191"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_1a30db249be9e4763dd0cd7bd91"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TABLE "children"`);
        await queryRunner.query(`DROP TABLE "father"`);
        await queryRunner.query(`DROP TABLE "kinder_garden"`);
        await queryRunner.query(`DROP TABLE "mother"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "staff_members"`);
        await queryRunner.query(`DROP TABLE "groups"`);
    }

}
