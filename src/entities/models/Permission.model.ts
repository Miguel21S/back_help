import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role_permission } from "./Role_permissions.model";


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

    @OneToMany(() => Role_permission, (role_permission) => role_permission.permission_id)
    role_permissions!: Role_permission[];
}