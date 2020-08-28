import {MigrationInterface, QueryRunner} from "typeorm";

export class Xyz1598608496363 implements MigrationInterface {
    name = 'Xyz1598608496363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Bike` DROP COLUMN `isResolved`");
        await queryRunner.query("ALTER TABLE `Bike` ADD `status` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `Bike` ADD `description` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `PoliceOfficer` ADD `isAvailable` tinyint NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `PoliceOfficer` DROP COLUMN `isAvailable`");
        await queryRunner.query("ALTER TABLE `Bike` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `Bike` DROP COLUMN `status`");
        await queryRunner.query("ALTER TABLE `Bike` ADD `isResolved` tinyint NOT NULL");
    }

}
