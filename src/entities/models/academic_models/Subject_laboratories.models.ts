import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subjects } from "./subjects.models";
import { Laboratories } from "./Laboratories.models";

@Entity('subject_laboratories')
export class Subject_laboratories extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'hours', type: 'tinyint'})
    hours!: number;

    @Column({name: 'mandatory'})
    mandatory!: boolean;

    @Column({name: 'subject_id'})
    subject_id!: number;

    @Column({name: 'laboratory_id'})
    laboratory_id!: number;

    @ManyToOne(()=> Subjects, (subjects)=> subjects.subject_laboratories)
    @JoinColumn({name: 'subject_id'})
    subjects!: Subjects;

    @ManyToOne(()=> Laboratories, (laboratories)=> laboratories.subject_laboratories)
    @JoinColumn({name: 'laboratory_id'})
    laboratories!: Laboratories;
}