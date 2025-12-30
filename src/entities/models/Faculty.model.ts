import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Institution } from "./Institutions.model";
import { Department } from "./Departments.model";
import { Program } from "./Programs.model";

@Entity('faculties')
export class Faculty extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ 'name': 'name' })
    name!: string;

    @Column({ 'name': 'dean' })
    dean!: string;

    @Column({ 'name': 'phone' })
    phone!: string;

    @Column({ 'name': 'email' })
    email!: string;

    @CreateDateColumn({ name: "created_date", type: "timestamp"})
    created_date!: Date;

    // @Column({ 'name': 'institution_id' })
    // institution_id!: number;

    @ManyToOne(() => Institution, (institution) => institution.faculties)
    @JoinColumn({ name: 'institution_id' })
    institution!: Institution;

    @OneToMany(()=> Department, (department) => department.faculty)
    departments!: Department[];

    @OneToMany(()=> Program, (program) => program.faculty)
    programs!: Program[];
}