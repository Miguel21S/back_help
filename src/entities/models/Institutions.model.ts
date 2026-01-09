import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Faculty } from "./Faculty.model";
import { Departments_academics } from "./Departments_academics.model";

@Entity("institutions")
export class Institution extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'name'})
    name!: string;

    @Column({name: 'description'})
    description!: string;

    @Column({name: 'type'})
    type!: string;

    @Column({name: 'address'})
    address?: string;

    @Column({name: 'country'})
    country?: string;

    @Column({name: 'province'})
    province?: string;

    @Column({name: 'city'})
    city?: string;

    @Column({name: 'postal_code'})
    postal_code?: string;

    @Column({name: 'phone'})
    phone?: string;

    @Column({name: 'email'})
    email?: string;

    @Column({name: 'website'})
    website?: string;

    @Column({name: 'isActive'})
    isActive?: boolean;

    @CreateDateColumn({ name: "created_date", type: "timestamp" })
    created_date?: Date;

    @OneToMany(() => Faculty, (faculty) => faculty.institution)
    faculties!: Faculty[];

    @OneToMany(() => Departments_academics, (dept_ademic) => dept_ademic.institution)
    departments_academics!: Departments_academics[];
}