import {MigrationInterface, QueryRunner} from "typeorm";

export class relation31657690732197 implements MigrationInterface {
    name = 'relation31657690732197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_zipcode" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_ac8a3fbed0028341c936740f5e2" UNIQUE ("address_zipcode")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_ac8a3fbed0028341c936740f5e2" FOREIGN KEY ("address_zipcode") REFERENCES "address"("zipcode") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_ac8a3fbed0028341c936740f5e2"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_ac8a3fbed0028341c936740f5e2"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_zipcode"`);
    }

}
