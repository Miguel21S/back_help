import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Buildings } from "../Buildings.model";
import { Teachers } from "../admin_institutions_models/Teachers.model";
import { User_role } from "./User_roles.model";
import { User_permission } from "./User_permission";
import { Employees } from "../admin_institutions_models/Employees.models";
import { Students } from "../students_models/students_models";


@Entity("users")
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'name' })
    name!: string;

    @Column({ name: 'lastName' })
    lastName!: string;

    @Column({ name: 'date_born' })
    date_born!: Date;

    @Column({ name: 'nationality' })
    nationality!: string;

    @Column({ name: 'gender' })
    gender!: string;

    @Column({ name: 'special_situation' })
    special_situation!: string;

    @Column({ name: 'phone' })
    phone!: string;

    @Column({ name: 'email' })
    email!: string;

    @Column({ name: 'type_document' })
    type_document?: string;

    @Column({ name: 'number_document' })
    number_document?: string;

    @Column({ name: 'avatar' })
    avatar?: string;

    @Column({ name: 'isActive' })
    isActive?: boolean;

    @Column({ type: "timestamp", nullable: true })
    deletedAt?: Date | null;

    @Column({ type: "timestamp", onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    last_login?: Date;

    @Column({ name: 'date_entry_apartment' })
    date_entry_apartment!: Date;

    @CreateDateColumn({ name: "created_date", type: "timestamp" })
    created_date!: Date;

    @Column({ name: 'password' })
    password!: string;

    @Column({ name: 'building_id' })
    building_id!: number;

    @ManyToOne(() => Buildings, (buildings) => buildings.users)
    @JoinColumn({ name: 'building_id' })
    building!: Buildings;

    @OneToMany(() => User_role, (user_role) => user_role.user_id)
    user_roles!: User_role[];

    @OneToMany(() => Teachers, (teachers) => teachers.user)
    teachers!: Teachers[];

    @OneToMany(() => User_permission, user_p => user_p.user)
    user_permissions!: User_permission[];

    @OneToMany(()=> Employees, (employees)=> employees.user)
    employees!: Employees[]

    @OneToMany(()=> Students, student => student.user)
    students!: Students[]
}