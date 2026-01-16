import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Faculty } from "./Faculty.model";
import { Students } from "../students_models/students_models";

export enum ProgramState {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    GRADUATED = 'GRADUATED',
    SUPENDED = 'SUPENDED'
}

@Entity("programs")
export class Programs extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'name' })
    name!: string;

    @Column({ name: 'degree' })
    degree!: string;

    @Column({ name: 'duration' })
    duration!: number;

    @Column({ name: 'total_credits' })
    total_credits!: number;

    @Column({ name: 'modality' })
    modality!: string;

    @Column({ name: 'coordinator' })
    coordinator!: string;

    @Column({
        name: "state",
        type: "enum",
        enum: ProgramState,
        default: ProgramState.ACTIVE
    })
    state!: ProgramState;

    @CreateDateColumn({ name: "created_date", type: "timestamp" })
    created_date!: Date;

    @Column({ name: 'faculty_id' })
    faculty_id!: number;

    @ManyToOne(() => Faculty, (faculty) => faculty.programs, {onDelete: 'RESTRICT'})
    @JoinColumn({ name: "faculty_id" })
    faculty!: Faculty;

    @OneToMany(()=> Students, (students)=> students.programs)
    students!: Students[]
}