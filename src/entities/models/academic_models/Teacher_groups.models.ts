import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Teachers } from "../admin_institutions_models/Teachers.model";
import { Groups } from "./Groups.models";

@Entity('teacher_groups')
export class Teacher_groups extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'teacher_id'})
    teacher_id!: number;

    @Column({name: 'group_id'})
    group_id!: number;

    @ManyToOne(()=> Teachers, (teachers)=> teachers.teacher_groups)
    @JoinColumn({name: 'teacher_id'})
    teachers!: Teachers;

    @ManyToOne(()=> Groups, (groups)=> groups.teacher_groups)
    @JoinColumn({name: 'group_id'})
    groups!: Groups;
}