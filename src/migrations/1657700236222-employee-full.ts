import {MigrationInterface, QueryRunner} from "typeorm";

export class employeeFull1657700236222 implements MigrationInterface {
    name = 'employeeFull1657700236222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "jdate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "jdate"`);
    }

}
