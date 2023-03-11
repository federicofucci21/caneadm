import { MigrationInterface, QueryRunner } from 'typeorm';

export class expenses1678547717463 implements MigrationInterface {
  name = 'expenses1678547717463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`expenses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`amount\` int NOT NULL, \`detail\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`provider_id\` int NULL, UNIQUE INDEX \`REL_d83d39f063e42fcb0512e3a99d\` (\`provider_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`providers\` ADD \`expenses_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`providers\` ADD CONSTRAINT \`FK_53a142b4a6518607736ceaa0b05\` FOREIGN KEY (\`expenses_id\`) REFERENCES \`expenses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expenses\` ADD CONSTRAINT \`FK_d83d39f063e42fcb0512e3a99d6\` FOREIGN KEY (\`provider_id\`) REFERENCES \`providers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`expenses\` DROP FOREIGN KEY \`FK_d83d39f063e42fcb0512e3a99d6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`providers\` DROP FOREIGN KEY \`FK_53a142b4a6518607736ceaa0b05\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`providers\` DROP COLUMN \`expenses_id\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_d83d39f063e42fcb0512e3a99d\` ON \`expenses\``,
    );
    await queryRunner.query(`DROP TABLE \`expenses\``);
  }
}
