import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Institution } from "./Institutions.model";
import { Departments_academics } from "./Departments_academics.model";
import { Program } from "./Programs.model";
import { Employees } from "./Employees.models";

@Entity('faculties')
export class Faculty extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'name' })
    name!: string;

    @Column({ name: 'description' })
    description!: string;

    @Column({ name: 'dean' })
    dean!: string;

    @Column({ name: 'phone' })
    phone!: string;

    @Column({ name: 'email' })
    email!: string;

    @Column({ name: 'isActive' })
    isActive?: boolean;

    @CreateDateColumn({ name: "created_date", type: "timestamp"})
    created_date!: Date;

    @Column({ name: 'institution_id' })
    institution_id!: number;

    @ManyToOne(() => Institution, (institution) => institution.faculties, {onDelete: 'RESTRICT'})
    @JoinColumn({ name: 'institution_id' })
    institution!: Institution;

    @OneToMany(()=> Departments_academics, (dept_ademic) => dept_ademic.faculty)
    departments_academics!: Departments_academics[];

    @OneToMany(()=> Program, (program) => program.faculty)
    programs!: Program[];

    @OneToMany(()=> Employees, (employees)=> employees.faculty)
    employees!: Employees[]
}