import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./Roles.model";
import { Permission } from "./Permission.model";

@Entity('role_permissions')
export class Role_permission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ "name": "role_id" })
    role_id!: number

    @Column({ "name": "permission_id" })
    permission_id!: number

    @ManyToOne(() => Roles, (role) => role.role_permissions)
    @JoinColumn({ name: 'role_id' })
    role!: Roles;

    @ManyToOne(() => Permission, (permission) => permission.role_permissions)
    @JoinColumn({ name: 'permission_id' })
    permission!: Permission;
}