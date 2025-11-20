import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./Roles.models";
import { Buildings } from "./Buildings.models";


@Entity("users")
export class Users extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({'name': 'name'})
    name!: string;

    @Column({'name': 'lastName'})
    lastName!: string;

    @Column({'name': 'date_born'})
    date_born!: Date;

    @Column({'name': 'nationality'})
    nationality!: string;

    @Column({'name': 'gender'})
    gender!: string;

    @Column({'name': 'special_situation'})
    special_situation!: string;

    @Column({'name': 'phone'})
    phone!: string;
    
    @Column({'name': 'email'})
    email!: string;

    @Column({'name': 'date_entry_apartment'})
    date_entry_apartment!: Date;

    @Column({ "name": "created_date" })
    created_date!: Date;
    
    @Column({'name': 'password'})
    password!: string;

    @Column({'name': 'building_id'})
    building_id!: number;
    
    @Column({'name': 'role_id'})
    role_id!: number;
    
    @ManyToOne(() => Buildings, (buildings) => buildings.users)
    @JoinColumn({'name': 'building_id'})
    building!: Buildings;
    
    @ManyToOne(() => Roles, (roles) => roles.users)
    @JoinColumn({'name': 'role_id'})
    role!: Roles;
}