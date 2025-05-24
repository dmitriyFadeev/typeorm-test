import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColorsTable1748029382532 implements MigrationInterface {
  name = 'AddColorsTable1748029382532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "v_color" ("id" SERIAL NOT NULL, "c_name" character varying NOT NULL, "c_hex" character varying NOT NULL, "c_rgb" character varying NOT NULL, CONSTRAINT "PK_bb0d00c9c430922077aab225456" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "v_color"`);
  }
}
