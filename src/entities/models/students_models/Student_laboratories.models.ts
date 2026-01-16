import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Laboratories } from "../academic_models/Laboratories.models";
import { Students } from "./students.models";

@Entity('student_laboratories')
export class Student_laboratories extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'practice_date' })
    practice_date!: Date;

    @Column({ name: 'attended' })
    attended!: boolean;

    @Column({ name: 'student_id' })
    student_id!: number;

    @Column({ name: 'laboratory_id' })
    laboratory_id!: number;

    @ManyToOne(() => Laboratories, (labs) => labs.student_laboratories)
    @JoinColumn({ name: 'laboratory_id' })
    laboratories!: Laboratories;

    @ManyToOne(() => Students, (student) => student.student_laboratories)
    @JoinColumn({ name: 'student_id' })
    students!: Students;
}