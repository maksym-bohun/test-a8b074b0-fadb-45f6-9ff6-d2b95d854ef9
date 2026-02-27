import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatedCampaignReportsTable1772227236739 implements MigrationInterface {
  name = 'CreatedCampaignReportsTable1772227236739';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "campaign_reports" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "campaign" character varying NOT NULL, "campaign_id" character varying NOT NULL, "adgroup" character varying NOT NULL, "adgroup_id" character varying NOT NULL, "ad" character varying NOT NULL, "ad_id" character varying NOT NULL, "client_id" character varying NOT NULL, "event_name" character varying NOT NULL, "event_time" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0f65908ce2852cb8e8f4960ab53" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_fc41bf2b50409288b16abc29b7" ON "campaign_reports" ("event_time", "client_id", "event_name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fc41bf2b50409288b16abc29b7"`,
    );
    await queryRunner.query(`DROP TABLE "campaign_reports"`);
  }
}
