import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role_permission } from "./Role_permissions.model";
import { User_permission } from "./user_permission";


@Entity("permission")
export class Permission extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({"name": "name", unique: true})
    name!: string;

    @Column({ "name": "description" })
    description!: string;

    @CreateDateColumn({"name": "created_date", type: "timestamp"})
    created_date!: Date;

    @UpdateDateColumn({"name": "created_updated", type: "timestamp"})
    updated_date!: Date;

    @OneToMany(() => Role_permission, (role_permission) => role_permission.permission)
    role_permissions!: Role_permission[];

    @OneToMany(() => User_permission, user_p => user_p.permission)
    user_permissions!: User_permission[];
}