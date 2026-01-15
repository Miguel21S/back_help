import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../roles_users_permission/Users.model";
import { Departments_academics } from "./Departments_academics.model";


@Entity('teachers')
export class Teachers extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'category' })
    category!: string;

    @Column({ name: 'specialty' })
    specialty!: string;

    @Column({ name: 'isActive' })
    isActive?: boolean;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt?: Date | null;

    @Column({ name: 'user_id' })
    user_id!: number;

    @CreateDateColumn({ name: "created_date", type: "timestamp" })
    created_date!: Date;

    @Column({ name: 'dept_academic_id' })
    dept_academic_id!: number;

    @ManyToOne(() => Users, (users) => users.teachers, {onDelete: 'RESTRICT'})
    @JoinColumn({ name: 'user_id' })
    user!: Users;

    @ManyToOne(() => Departments_academics, (dept_ademic) => dept_ademic.teachers, {onDelete: 'RESTRICT'})
    @JoinColumn({ name: 'dept_academic_id' })
    departments_academics!: Departments_academics;
}