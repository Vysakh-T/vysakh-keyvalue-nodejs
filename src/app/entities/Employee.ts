import { Address } from "./Address";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Department } from "./Department";

@Entity("employee")
export class Employee extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false })
    public name: string;

    @Column({ nullable: false })
    public jdate: string;

    @Column({ nullable: true })
    public password: string;

    @Column({ nullable: false, unique: true })
    public email: string;

    @Column({ nullable: false })
    public role: string;

    @Column({ nullable: false })
    public status: string;

    @Column({ nullable: false })
    public experience: string;

    @ManyToOne(() => Department, { cascade: true })
    @JoinColumn()
    public department: Department;

    @Column({ nullable: false })
    public departmentId: string;

    @OneToOne(() => Address, { cascade: true })
    @JoinColumn()
    public address: Address;
}
