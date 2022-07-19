import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Department } from "./Department";
import { Employee } from "./Employee";

@Entity("address")
export class Address extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
    
    @Column()
    public zipcode: string;

    @Column({ nullable: false })
    public desc: string;

    // @OneToOne(() => Employee, { cascade: true })
    // @JoinColumn()
    // public employee: Employee;

}