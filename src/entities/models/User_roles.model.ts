import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./Roles.model";
import { Users } from "./Users.model";

@Entity("user_roles")
export class User_role extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ "name": "user_id" })
    user_id!: number;

    @Column({ "name": "role_id" })
    role_id!: number;

    @ManyToOne(() => Roles, (roles) => roles.user_roles)
    @JoinColumn({ 'name': 'role_id' })
    role!: Roles;

    @ManyToOne(() => Users, (users) => users.user_roles)
    @JoinColumn({ 'name': 'user_id' })
    user!: Users;
}