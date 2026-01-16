import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../users_models/Users.model";
import { Programs } from "../admin_institutions_models/Programs.model";

@Entity('students')
export class Students extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: 'date_admission', type: 'timestamp'})
    date_admission!: Date;

    @Column({name: 'state'})
    state!: string;

    @Column({name: 'isActive'})
    isActive!: boolean;

    @Column({name: 'user_id'})
    user_id!: number;

    @Column({name: 'program_id'})
    program_id!: number;

    @ManyToOne(()=> Users, (user)=> user.students, {onDelete: 'RESTRICT'})
    @JoinColumn({name: 'user_id'})
    user!: Users;

    @ManyToOne(()=> Programs, programs => programs.students, {onDelete: 'RESTRICT'})
    @JoinColumn({name: 'program_id'})
    programs!: Programs;
}