import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./Roles.models";


@Entity("permission")
export class Permission extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({"name": "permission_name"})
    permission_name!: string

    @Column({"name": "role_id"})
    role_id!: number

    @ManyToOne(()=> Roles, (roles)=> roles.permission)
    @JoinColumn({"name": "role_id"})
    role!: Roles
}