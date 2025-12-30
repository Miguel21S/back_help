import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Faculty } from "./Faculty.model";


@Entity("programs")
export class Program extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ 'name': 'name' })
    name!: string;

    @Column({ 'name': 'degree' })
    degree!: string;

    @Column({ 'name': 'duration' })
    duration!: number;

    @Column({ 'name': 'total_credits' })
    total_credits!: number;

    @Column({ 'name': 'modality' })
    modality!: string;

    @Column({ 'name': 'coordinator' })
    coordinator!: string;

    @CreateDateColumn({ name: "created_date", type: "timestamp" })
    created_date!: Date;

    @Column({ 'name': 'faculty_id' })
    faculty_id!: number;

    @ManyToOne(() => Faculty, (faculty) => faculty.programs)
    @JoinColumn({ name: "faculty_id" })
    faculty!: Faculty;
}