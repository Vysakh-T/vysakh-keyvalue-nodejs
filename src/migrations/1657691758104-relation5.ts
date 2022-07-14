import {MigrationInterface, QueryRunner} from "typeorm";

export class relation51657691758104 implements MigrationInterface {
    name = 'relation51657691758104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_7e77f562043393b08de949b804b"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_ac8a3fbed0028341c936740f5e2"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "employee_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME CONSTRAINT "REL_7e77f562043393b08de949b804" TO "UQ_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "address_zipcode" TO "address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME CONSTRAINT "UQ_ac8a3fbed0028341c936740f5e2" TO "UQ_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_9077d15cb9f635f2a38ef42c9c2"`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_c4c84bbcd91ca7a1ae55845e283" PRIMARY KEY ("zipcode", "id")`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "UQ_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_c4c84bbcd91ca7a1ae55845e283"`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_id" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_c4c84bbcd91ca7a1ae55845e283" PRIMARY KEY ("zipcode", "id")`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "UQ_d92de1f82754668b5f5f5dd4fd5" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_c4c84bbcd91ca7a1ae55845e283"`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_9077d15cb9f635f2a38ef42c9c2" PRIMARY KEY ("zipcode")`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194" TO "UQ_ac8a3fbed0028341c936740f5e2"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "address_id" TO "address_zipcode"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME CONSTRAINT "UQ_d92de1f82754668b5f5f5dd4fd5" TO "REL_7e77f562043393b08de949b804"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME COLUMN "id" TO "employee_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_ac8a3fbed0028341c936740f5e2" FOREIGN KEY ("address_zipcode") REFERENCES "address"("zipcode") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_7e77f562043393b08de949b804b" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
