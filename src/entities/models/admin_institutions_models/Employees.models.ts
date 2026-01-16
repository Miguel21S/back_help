import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../users_models/Users.model";
import { Faculty } from "./Faculty.model";
import { Departments_academics } from "./Departments_academics.model";

@Entity('employees')
export class Employees extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: 'category'})
    category!: string;

    @Column({name: 'isActive'})
    isActive!: boolean;

    @Column({ type: "timestamp", nullable: true })
    deletedAt?: Date | null;

    @Column({name: 'created_date', type: 'timestamp'})
    created_date!: Date;

    @Column({name: 'user_id'})
    user_id!: number;

    @Column({name: 'faculty_id'})
    faculty_id!: number;

    @Column({name: 'dpto_academic_id'})
    dpto_academic_id!: number;

    @ManyToOne(()=> Users, (user)=> user.employees)
    @JoinColumn({name: 'user_id'})
    user!: Users;

    @ManyToOne(()=> Faculty, (faculty)=> faculty.employees, {onDelete: 'RESTRICT'})
    @JoinColumn({name: 'faculty_id'})
    faculty!: Faculty;

    @ManyToOne(()=> Departments_academics, (dpto_academic)=> dpto_academic.employees, {onDelete: 'RESTRICT'})
    @JoinColumn({name: 'dpto_academic_id'})
    departments_academics!: Departments_academics;
}