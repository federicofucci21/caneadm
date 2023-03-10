import { MigrationInterface, QueryRunner } from "typeorm";

export class init1678330989105 implements MigrationInterface {
    name = 'init1678330989105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL DEFAULT 'cane', \`email\` varchar(255) NOT NULL DEFAULT 'cane@cane.com', \`cell\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL DEFAULT 'casa 123', \`is_active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_cd2d7e8361b8ecf2d2e4f86a05\` (\`cell\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`stock\` int NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products_for_order_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`quantity\` int NOT NULL, \`product_id\` int NULL, \`order_include_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`state\` varchar(255) NOT NULL DEFAULT 'open', \`total\` int NOT NULL DEFAULT '0', \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products_for_order_entity\` ADD CONSTRAINT \`FK_b4a67a17a1b709de10b268deadb\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products_for_order_entity\` ADD CONSTRAINT \`FK_095b350d2182a9f733b13757806\` FOREIGN KEY (\`order_include_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a922b820eeef29ac1c6800e826a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_a922b820eeef29ac1c6800e826a\``);
        await queryRunner.query(`ALTER TABLE \`products_for_order_entity\` DROP FOREIGN KEY \`FK_095b350d2182a9f733b13757806\``);
        await queryRunner.query(`ALTER TABLE \`products_for_order_entity\` DROP FOREIGN KEY \`FK_b4a67a17a1b709de10b268deadb\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP TABLE \`products_for_order_entity\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP INDEX \`IDX_cd2d7e8361b8ecf2d2e4f86a05\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
