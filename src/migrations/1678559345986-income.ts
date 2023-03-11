import { MigrationInterface, QueryRunner } from 'typeorm';

export class income1678559345986 implements MigrationInterface {
  name = 'income1678559345986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`incomes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`amount\` int NOT NULL, \`detail\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`expenses\` ADD CONSTRAINT \`FK_d83d39f063e42fcb0512e3a99d6\` FOREIGN KEY (\`provider_id\`) REFERENCES \`providers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`expenses\` DROP FOREIGN KEY \`FK_d83d39f063e42fcb0512e3a99d6\``,
    );
    await queryRunner.query(`DROP TABLE \`incomes\``);
  }
}
