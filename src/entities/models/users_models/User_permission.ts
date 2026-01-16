import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../users_models/Users.model";
import { Permission } from "../admin/Permission.model";

@Entity("user_permissions")
export class User_permission extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "user_id" })
    user_id!: number;

    @Column({ name: "permission_id" })
    permission_id!: number;

    @ManyToOne(() => Users, user => user.user_permissions)
    @JoinColumn({ name: "user_id" })
    user!: Users;

    @ManyToOne(() => Permission, permission => permission.user_permissions)
    @JoinColumn({ name: "permission_id" })
    permission!: Permission;
}
