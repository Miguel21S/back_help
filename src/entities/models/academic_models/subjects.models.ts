import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Faculty } from "../admin_institutions_models/Faculty.model";
import { Departments_academics } from "../admin_institutions_models/Departments_academics.model";
import { Courses } from "./Courses.models";
import { Groups } from "./Groups.models";
import { SubjectLaboratories } from "./Subject_laboratories.models";
import { StudentSubjects } from "../students_models/Student_subjects.models";

@Entity('subjects')
export class Subjects extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'name' })
    name!: string;

    @Column({ name: 'subject_code' })
    subject_code!: string;

    @Column({ name: 'total_credits' })
    total_credits!: number;

    @Column({ name: 'semester' })
    semester!: string;

    @Column({ name: 'type' })
    type!: string;

    @Column({ name: 'description' })
    description!: string;

    @Column({ name: 'isActive' })
    isActive!: boolean;

    @Column({ name: 'faculty_id' })
    faculty_id!: number;

    @Column({ name: 'dpto_academic_id' })
    dpto_academic_id!: number;

    @ManyToOne(() => Faculty, (faculty) => faculty.subjects, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'faculty_id' })
    faculty!: Faculty;

    @ManyToOne(() => Departments_academics, (dpto_academic) => dpto_academic.subjects, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'dpto_academic_id' })
    departments_academics!: Departments_academics;

    @OneToMany(() => Courses, (course) => course.subjects)
    courses!: Courses[];

    @OneToMany(() => Groups, (groups) => groups.subjects)
    groups!: Groups[];

    @OneToMany(() => SubjectLaboratories, (subject_labs) => subject_labs.subjects)
    subject_laboratories!: Groups[];

    @OneToMany(() => StudentSubjects, (student_subj) => student_subj.subjects)
    student_subjects!: StudentSubjects[];
}