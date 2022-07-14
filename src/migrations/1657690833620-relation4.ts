import {MigrationInterface, QueryRunner} from "typeorm";

export class relation41657690833620 implements MigrationInterface {
    name = 'relation41657690833620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "name" TO "desc"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "desc" TO "name"`);
    }

}
