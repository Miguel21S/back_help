import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subjects } from "./subjects.models";
import { Groups_shedules } from "./Groups_shedules.models";
import { Teacher_groups } from "./Teacher_groups.models";
import { Student_groups } from "../students_models/Student_groups.models";

@Entity('groups')
export class Groups extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'name'})
    name!: string;

    @Column({name: 'year', type: 'smallint'})
    year!: number;

    @Column({name: 'semester', type: 'tinyint'})
    semester!: number;
    
    @Column({name: 'subject_id'})
    subject_id!: number;

    @Column({name: 'isActive'})
    isActive!: boolean;

    @ManyToOne(()=> Subjects, (subjects)=> subjects.groups, {onDelete: 'RESTRICT'})
    @JoinColumn({name: 'subject_id'})
    subjects!: Subjects;

    @OneToMany(()=> Groups_shedules, (group_shed)=> group_shed.groups)
    groups_shedules!: Groups_shedules[];
    
    @OneToMany(()=> Teacher_groups, (teacher_group)=> teacher_group.groups)
    teacher_groups!: Teacher_groups[];

    @OneToMany(()=> Student_groups, (student_group)=> student_group.groups)
    student_groups!: Student_groups[];
}