import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Faculty } from "./Faculty.model";
import { Institution } from "./Institutions.model";
import { Teachers } from "./Teachers.model";


@Entity("departments_academics")
export class Departments_academics extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'name' })
    name!: string;

    @Column({ name: 'description' })
    description!: string;

    @Column({ name: 'department_head' })
    department_head?: string;

    @Column({ name: 'email' })
    email?: string;

    @Column({name: 'isActive'})
    isActive?: boolean

    @CreateDateColumn({ name: "created_date", type: "timestamp"})
    created_date!: Date;

    @Column({ name: 'institution_id' })
    institution_id!: number;

    @Column({ name: 'faculty_id' })
    faculty_id!: number;

    @ManyToOne(() => Faculty, (faculty) => faculty.departments_academics, {onDelete: 'RESTRICT'})
    @JoinColumn({ name: 'faculty_id' })
    faculty!: Faculty;

    @ManyToOne(() => Institution, (institution) => institution.departments_academics, {onDelete: 'RESTRICT'})
    @JoinColumn({name: 'institution_id'})
    institution!: Institution;

    // @OneToMany(() => Employee, (employee) => employee.department)
    // employees!: Employee[];

    @OneToMany(() => Teachers, (teachers) => teachers.departments_academics)
    teachers!: Teachers[];
}