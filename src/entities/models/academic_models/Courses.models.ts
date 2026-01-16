import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subjects } from "./subjects.models";

@Entity('courses')
export class Courses extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'name'})
    name!: string;

    @Column({name: 'academic_year'})
    academic_year!: string;

    @Column({name: 'semester'})
    semester!: string;

    @Column({name: 'state'})
    state!: string;

    @Column({name: 'isActive'})
    isActive!: boolean;

    @Column({name: 'subject_id'})
    subject_id!: number;

    @ManyToOne(()=> Subjects, (subjects)=> subjects.courses, {onDelete: 'RESTRICT'})
    @JoinColumn({name: 'subject_id'})
    subjects!: Subjects
}