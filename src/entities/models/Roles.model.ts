import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./Users.model";
import { Permission } from "./Permission.model";
import { Role_permission } from "./Role_permissions.model";
import { User_role } from "./User_roles.model";
// import { permission } from "process";


@Entity("roles")
export class Roles extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({"name": "name"})
    name!: string;

    @Column({ "name": "description" })
    description!: string;

    @CreateDateColumn({ name: "created_date", type: "timestamp"})
    created_date!: Date;

    @UpdateDateColumn({ "name": "date_updated", type: "timestamp"})
    date_updated!: Date;

    @OneToMany(() => User_role, (user_role) => user_role.role)
    user_roles!: User_role[];

    @OneToMany(() => Role_permission, (role_permission) => role_permission.role)
    role_permissions!: Role_permission[];
    
    // @OneToMany(()=> Permission, (permission)=> permission.role_id)
    // permission!: Permission[];
}