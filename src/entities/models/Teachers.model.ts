import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users.model";
import { Departments_academics } from "./Departments_academics.model";


@Entity('teachers')
export class Teacher extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'category' })
    category!: string;

    @Column({ name: 'specialty' })
    specialty!: string;

    @Column({ name: 'isActive' })
    isActive?: boolean;

    @Column({ name: 'user_id' })
    user_id!: number;

    @CreateDateColumn({ name: "created_date", type: "timestamp" })
    created_date!: Date;

    @Column({ name: 'department_id' })
    department_id!: number;

    @ManyToOne(() => Users, (users) => users.teachers, {onDelete: 'RESTRICT'})
    @JoinColumn({ name: 'user_id' })
    user!: Users;

    @ManyToOne(() => Departments_academics, (dept_ademic) => dept_ademic.teachers, {onDelete: 'RESTRICT'})
    @JoinColumn({ name: 'department_id' })
    departments_academics!: Departments_academics;
}