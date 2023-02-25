import { MigrationInterface, QueryRunner } from "typeorm";

export class userTest1677336287931 implements MigrationInterface {
    name = 'userTest1677336287931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_human\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_human\``);
    }

}
