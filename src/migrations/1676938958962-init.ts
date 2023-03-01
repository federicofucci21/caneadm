import { MigrationInterface, QueryRunner } from "typeorm";

export class init1676938958962 implements MigrationInterface {
    name = 'init1676938958962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_funny\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_funny\``);
    }

}
