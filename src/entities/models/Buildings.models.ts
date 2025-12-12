import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users.models";


@Entity("buildings")
export class Buildings extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    // @Column({ "name": "address" })
    // address_line1!: string;
    // @Column({ "name": "number_build" })
    // number_build!: string;

    @Column({ "name": "address_1" })
    address_1!: string;

    @Column({ "name": "address_2" })
    address_2!: string;


    @Column({ "name": "country" })
    country!: string;
    
    @Column({ "name": "province" })
    province!: string;

    @Column({ "name": "city" })
    city!: string;

    @Column({ "name": "postal_code" })
    postal_code!: string;

    @Column({ "name": "build_type" })
    build_type!: string;

    @Column({ "name": "last_maintenance" })
    last_maintenance!: string;

    // @Column({ "name": "admin_responsible" })
    // admin_responsible!: string;
    
    @Column({ "name": "general_status" })
    general_status!: string;
    
    @Column({ "name": "services_available" })
    services_available!: string;
    
    // @Column({ "name": "photo" })
    // photo!: string;

    @Column({ "name": "quantity_apartment" })
    quantity_apartment!: number;

    
    @Column({ "name": "floor_number" })
    floor_number!: string;

    @OneToMany(() => Users, (users) => users.building)
    users!: Users[];
}