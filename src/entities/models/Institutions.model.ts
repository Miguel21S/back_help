import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Faculty } from "./Faculty.model";
import { Department } from "./Departments.model";

@Entity("institutions")
export class Institution extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({'name': 'name'})
    name!: string;

    @Column({'name': 'type'})
    type!: string;

    @Column({'name': 'address'})
    address?: string;

    @Column({'name': 'country'})
    country?: string;

    @Column({'name': 'province'})
    province?: string;

    @Column({'name': 'city'})
    city?: string;

    @Column({'name': 'postal_code'})
    postal_code?: string;

    @Column({'name': 'phone'})
    phone?: string;

    @Column({'name': 'email'})
    email?: string;

    @Column({'name': 'website'})
    website?: string;

    @Column({'name': 'date_creation'})  
    date_creation?: Date;

    @OneToMany(() => Faculty, (faculty) => faculty.institution)
    faculties!: Faculty[];

    @OneToMany(() => Department, (department) => department.institution)
    departments!: Department[];
}