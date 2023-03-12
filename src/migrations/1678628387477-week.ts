import { MigrationInterface, QueryRunner } from 'typeorm';

export class week1678628387477 implements MigrationInterface {
  name = 'week1678628387477';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`weeks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`detail\` varchar(255) NOT NULL, \`open\` datetime NOT NULL, \`close\` datetime NOT NULL, \`status\` enum ('open', 'close') NOT NULL DEFAULT 'open', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
    await queryRunner.query(`ALTER TABLE \`incomes\` ADD \`week_id\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`week_id\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`outgoes\` ADD \`week_id\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`expenses\` ADD \`week_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`incomes\` ADD CONSTRAINT \`FK_fc212aec17e7b752df52f4ae42c\` FOREIGN KEY (\`week_id\`) REFERENCES \`weeks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_9c72c4a4fb5ebae1afc0d293270\` FOREIGN KEY (\`week_id\`) REFERENCES \`weeks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`outgoes\` ADD CONSTRAINT \`FK_6d396e173934c3b9aaaf1d87b73\` FOREIGN KEY (\`week_id\`) REFERENCES \`weeks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expenses\` ADD CONSTRAINT \`FK_830d08b7c5cc67f634b89827ee3\` FOREIGN KEY (\`week_id\`) REFERENCES \`weeks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`expenses\` DROP FOREIGN KEY \`FK_830d08b7c5cc67f634b89827ee3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`outgoes\` DROP FOREIGN KEY \`FK_6d396e173934c3b9aaaf1d87b73\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_9c72c4a4fb5ebae1afc0d293270\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`incomes\` DROP FOREIGN KEY \`FK_fc212aec17e7b752df52f4ae42c\``,
    );
    await queryRunner.query(`ALTER TABLE \`expenses\` DROP COLUMN \`week_id\``);
    await queryRunner.query(`ALTER TABLE \`outgoes\` DROP COLUMN \`week_id\``);
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`week_id\``);
    await queryRunner.query(`ALTER TABLE \`incomes\` DROP COLUMN \`week_id\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`role\` enum ('client', 'local') NOT NULL DEFAULT 'client'`,
    );
    await queryRunner.query(`DROP TABLE \`weeks\``);
  }
}
