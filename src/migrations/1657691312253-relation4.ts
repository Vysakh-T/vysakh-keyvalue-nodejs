import {MigrationInterface, QueryRunner} from "typeorm";

export class relation41657691312253 implements MigrationInterface {
    name = 'relation41657691312253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "id" character varying NOT NULL`);
    }

}
