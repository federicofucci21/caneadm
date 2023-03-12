import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRole1678628993564 implements MigrationInterface {
  name = 'UserRole1678628993564';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`role\` enum ('client', 'local') NOT NULL DEFAULT 'client'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
  }
}
