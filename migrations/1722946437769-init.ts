import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1722946437769 implements MigrationInterface {
    name = 'Init1722946437769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f313d9c6aa73b30e4843e343849"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "tasks_included_id" TO "projects_included_id"`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "project_id" uuid, CONSTRAINT "PK_3d2a17149b660c4f9183241b911" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_projects" ADD CONSTRAINT "FK_86ef6061f6f13aa9252b12cbe87" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_projects" ADD CONSTRAINT "FK_4c6aaf014ba0d66a74bb5522726" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_2b9338bceca070943a3acb55d7d" FOREIGN KEY ("projects_included_id") REFERENCES "user_projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_2b9338bceca070943a3acb55d7d"`);
        await queryRunner.query(`ALTER TABLE "user_projects" DROP CONSTRAINT "FK_4c6aaf014ba0d66a74bb5522726"`);
        await queryRunner.query(`ALTER TABLE "user_projects" DROP CONSTRAINT "FK_86ef6061f6f13aa9252b12cbe87"`);
        await queryRunner.query(`DROP TABLE "user_projects"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "projects_included_id" TO "tasks_included_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f313d9c6aa73b30e4843e343849" FOREIGN KEY ("tasks_included_id") REFERENCES "user_tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
