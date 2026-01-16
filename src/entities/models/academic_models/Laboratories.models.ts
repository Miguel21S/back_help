import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subject_laboratories } from "./Subject_laboratories.models";
import { Student_laboratories } from "../students_models/Student_laboratories.models";

@Entity('laboratories')
export class Laboratories extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'name' })
    name!: string;

    @Column({ name: 'capacity' })
    capacity!: number;

    @Column({ name: 'location' })
    location!: string;

    @Column({ name: 'equipment' })
    equipment!: string;

    @Column({ name: 'isActive' })
    isActive!: boolean;

    @OneToMany(() => Subject_laboratories, (subject_labs) => subject_labs.laboratories)
    subject_laboratories!: Subject_laboratories[];

    @OneToMany(() => Student_laboratories, (student_labs) => student_labs.laboratories)
    student_laboratories!: Student_laboratories[];

}