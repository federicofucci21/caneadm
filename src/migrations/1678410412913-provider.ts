import { MigrationInterface, QueryRunner } from 'typeorm';

export class provider1678410412913 implements MigrationInterface {
  name = 'provider1678410412913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`providers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`cell\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_8c3318c4baac9abdb219bbef2b\` (\`cell\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_8c3318c4baac9abdb219bbef2b\` ON \`providers\``,
    );
    await queryRunner.query(`DROP TABLE \`providers\``);
  }
}
