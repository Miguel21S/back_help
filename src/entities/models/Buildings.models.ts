import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users.models";


@Entity("buildings")
export class Buildings extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ "name": "address" })
    address!: string;

    @Column({ "name": "number_build" })
    number_build!: string;

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

    @Column({ "name": "quantity_apartment" })
    quantity_apartment!: number;

    
    @Column({ "name": "floor_number" })
    floor_number!: string;

    @OneToMany(() => Users, (users) => users.building)
    users!: Users[];
}