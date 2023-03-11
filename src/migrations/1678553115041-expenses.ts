import { MigrationInterface, QueryRunner } from 'typeorm';

export class expenses1678553115041 implements MigrationInterface {
  name = 'expenses1678553115041';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`expenses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`amount\` int NOT NULL, \`detail\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`provider_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_a922b820eeef29ac1c6800e826a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products_for_order_entity\` DROP FOREIGN KEY \`FK_095b350d2182a9f733b13757806\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products_for_order_entity\` DROP FOREIGN KEY \`FK_b4a67a17a1b709de10b268deadb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`expenses\` DROP FOREIGN KEY \`FK_d83d39f063e42fcb0512e3a99d6\``,
    );
    await queryRunner.query(`DROP TABLE \`orders\``);
    await queryRunner.query(`DROP TABLE \`products_for_order_entity\``);
    await queryRunner.query(`DROP TABLE \`products\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_cd2d7e8361b8ecf2d2e4f86a05\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`expenses\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8c3318c4baac9abdb219bbef2b\` ON \`providers\``,
    );
    await queryRunner.query(`DROP TABLE \`providers\``);
  }
}
