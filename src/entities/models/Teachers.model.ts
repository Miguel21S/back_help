import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users.model";
import { Department } from "./Departments.model";


@Entity('teachers')
export class Teacher extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({'name': 'category'})
    category!: string;

    @Column({'name': 'specialty'})
    specialty!: string;

    @Column({'name': 'user_id'})
    user_id!: number;

    @CreateDateColumn({ name: "created_date", type: "timestamp"})
    created_date!: Date;

    @Column({'name': 'department_id'})
    department_id!: number;

    @ManyToOne(()=> Users, (users) => users.teachers)
    @JoinColumn({'name': 'user_id'})
    user!: Users;

    @ManyToOne(()=> Department, (department) => department.teachers)
    @JoinColumn({'name': 'department_id'})
    department!: Department;
}