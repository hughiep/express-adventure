import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1721035907795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`CREATE TABLE "users" (
    "id" integer PRIMARY KEY,
    "email" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    "created_at" timestampz
  )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`DROP TABLE "users"`);
  }
}
