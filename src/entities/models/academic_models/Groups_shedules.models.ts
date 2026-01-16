import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Groups } from "./Groups.models";
import { Classrooms } from "./Classrooms.models";

@Entity('groups_shedules')
export class Groups_shedules extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'day_of_week', type: 'smallint'})
    day_of_week!: number;

    @Column({name: 'start_time'})
    start_time!: string;

    @Column({name: 'end_time'})
    end_time!: string;

    @Column({name: 'group_id'})
    group_id!: number

    @Column({name: 'classroom_id'})
    classroom_id!: number;

    @ManyToOne(()=> Groups,(groups)=> groups.groups_shedules)
    @JoinColumn({name: 'group_id'})
    groups!: Groups;

    @ManyToOne(()=> Classrooms,(classrooms)=> classrooms.groups_shedules, {onDelete: 'RESTRICT'})
    @JoinColumn({name: 'classroom_id'})
    classrooms!: Classrooms;
}