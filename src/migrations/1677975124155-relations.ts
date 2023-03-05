import { MigrationInterface, QueryRunner } from "typeorm";

export class relations1677975124155 implements MigrationInterface {
    name = 'relations1677975124155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`quantity\` int NOT NULL, \`price\` int NOT NULL, \`order_id\` int NULL, \`product_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`celphone\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`is_funny\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`is_human\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`cell\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_3ff3367344edec5de2355a562ee\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_ce1f689e43b39edd9330cadaeb8\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a922b820eeef29ac1c6800e826a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_a922b820eeef29ac1c6800e826a\``);
        await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_ce1f689e43b39edd9330cadaeb8\``);
        await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_3ff3367344edec5de2355a562ee\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`cell\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`is_human\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`is_funny\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`celphone\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`order_details\``);
    }

}
