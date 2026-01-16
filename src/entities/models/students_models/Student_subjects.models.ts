import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Students } from "./students.models";
import { Subjects } from "../academic_models/subjects.models";

@Entity('student_subjects')
export class Student_subjects extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'student_id' })
    student_id!: number;

    @Column({ name: 'subject_id' })
    subject_id!: number;

    @ManyToOne(() => Students, (student) => student.student_subjects)
    @JoinColumn({ name: 'student_id' })
    students!: Students;

    @ManyToOne(() => Subjects, (subject) => subject.student_subjects)
    @JoinColumn({ name: 'subject_id' })
    subjects!: Subjects;
}