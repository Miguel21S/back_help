import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Groups_shedules } from "./Groups_shedules.models";

@Entity('classrooms')
export class Classrooms extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'name'})
    name!: string;

    @Column({name: 'capacity'})
    capacity!: number;

    @Column({name: 'location'})
    location!: string;

    @Column({name: 'type'})
    type!: string;

    @Column({name: 'isActive'})
    isActive!: boolean;

    @Column({type: 'timestamp', nullable: true})
    deletedAt!: Date | null;

    @OneToMany(()=> Groups_shedules, (group_shed)=> group_shed.classrooms)
    groups_shedules!: Groups_shedules[];
}