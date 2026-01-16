import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../users_models/Users.model";
import { Programs } from "../admin_institutions_models/Programs.model";
import { Student_subjects } from "./Student_subjects.models";
import { Student_laboratories } from "./Student_laboratories.models";
import { Student_groups } from "./Student_groups.models";

@Entity('students')
export class Students extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: 'date_admission', type: 'timestamp'})
    date_admission!: Date;

    @Column({name: 'state'})
    state!: string;

    @Column({name: 'isActive'})
    isActive!: boolean;

    @Column({name: 'user_id'})
    user_id!: number;

    @Column({name: 'program_id'})
    program_id!: number;

    @ManyToOne(()=> Users, (user)=> user.students, {onDelete: 'RESTRICT'})
    @JoinColumn({name: 'user_id'})
    user!: Users;

    @ManyToOne(()=> Programs, programs => programs.students, {onDelete: 'RESTRICT'})
    @JoinColumn({name: 'program_id'})
    programs!: Programs;

    @OneToMany(()=> Student_subjects, (student_subj)=>student_subj.students)
    student_subjects!: Student_subjects[];

    @OneToMany(()=> Student_laboratories, (student_labs)=>student_labs.students)
    student_laboratories!: Student_laboratories[];

    @OneToMany(()=> Student_groups, (student_group)=>student_group.students)
    student_groups!: Student_groups[];
}