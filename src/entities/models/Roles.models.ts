import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users.models";
import { Permission } from "./Permission.model";
// import { permission } from "process";


@Entity("roles")
export class Roles extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({"name": "name"})
    name!: string;

    @OneToMany(() => Users, (users) => users.role_id)
    users!: Users[];

    @OneToMany(()=> Permission, (permission)=> permission.role_id)
    permission!: Permission[];
}