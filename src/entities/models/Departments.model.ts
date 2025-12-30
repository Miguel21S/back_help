import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Faculty } from "./Faculty.model";
import { Teacher } from "./Teachers.model";
import { Institution } from "./Institutions.model";


@Entity("departments")
export class Department extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ 'name': 'name' })
    name!: string;

    @Column({ 'name': 'department_head' })
    department_head?: string;

    @Column({ 'name': 'email' })
    email?: string;

    @CreateDateColumn({ name: "created_date", type: "timestamp"})
    created_date!: Date;

    @Column({ 'name': 'faculty_id' })
    faculty_id!: number;

    @ManyToOne(() => Faculty, (faculty) => faculty.departments)
    @JoinColumn({ name: 'faculty_id' })
    faculty!: Faculty;

    @ManyToOne(() => Institution, (institution) => institution.departments)
    institution!: Institution;

    // @OneToMany(() => Employee, (employee) => employee.department)
    // employees!: Employee[];

    @OneToMany(() => Teacher, (teacher) => teacher.department)
    teachers!: Teacher[];
}