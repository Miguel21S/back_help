import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Groups } from "../academic_models/Groups.models";
import { Students } from "./students.models";

@Index(['student_id', 'group_id'], { unique: true })
@Entity('student_groups')
export class Student_groups extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'student_id' })
    student_id!: number;

    @Column({ name: 'group_id' })
    group_id!: number;

    @ManyToOne(() => Groups, (group) => group.student_groups)
    @JoinColumn({ name: 'group_id' })
    groups!: Groups;

    @ManyToOne(() => Students, (student) => student.student_groups)
    @JoinColumn({ name: 'student_id' })
    students!: Students;
}