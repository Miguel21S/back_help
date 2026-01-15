import 'dotenv/config';
import "reflect-metadata";
import { DataSource } from "typeorm";

import { Role1731800867772 } from './migrations/admin/1731800867772-role';
import { Buildings1762618117246 } from './migrations/1762618117246-buildings';
import { Users1762634123551 } from './migrations/users_migrations/1762634123551-users';
import { Permission1737758326811 } from './migrations/admin/1737758326811-permission';

import { Roles } from '../../entities/models/Roles.model';
import { Users } from '../../entities/models/roles_users_permission/Users.model';
import { Permission } from '../../entities/models/roles_users_permission/Permission.model';
import { Buildings } from '../../entities/models/Buildings.model';
import { Role_permission } from '../../entities/models/roles_users_permission/Role_permissions.model';
import { User_role } from '../../entities/models/roles_users_permission/User_roles.model';
import { UserRoles1767057541372 } from './migrations/users_migrations/1767057541372-user_roles';
import { Teachers } from '../../entities/models/admin_models_institution/Teachers.model';
import { Institution } from '../../entities/models/admin_models_institution/Institutions.model';
import { Faculty } from '../../entities/models/admin_models_institution/Faculty.model';
import { Departments_academics } from '../../entities/models/Departments_academics.model';
import { Program } from '../../entities/models/Programs.model';
import { Institutions1766925750381 } from './migrations/admin_module/1766925750381-institutions';
import { Faculties1766925853555 } from './migrations/admin_module/1766925853555-faculties';
import { DepartmentsAcademics1767961580049 } from './migrations/admin_module/1767961580049-departments_academics';
import { Teachers1767965781165 } from './migrations/admin_module/1767965781165-teachers';
import { Programs1766934920847 } from './migrations/admin_module/1766934920847-programs';
import { User_permission } from '../../entities/models/User_permission';
import { UserPermissions1767434295157 } from './migrations/users_migrations/1767434295157-user_permissions';
import { RolePermissions1767439621713 } from './migrations/admin/1767439621713-role_permissions';

export const AppDataSource = new DataSource({
    type: "mysql",
    // host: process.env.DB_HOST || "localhost",
    host: process.env.DB_HOST || "database",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "2511",
    database: process.env.DB_DATABASE || "help_me_dev",

    entities: [Roles, Permission, Role_permission, User_role, Buildings, Users,
        User_permission, Institution, Faculty, Departments_academics, Teachers, Program

    ],

    migrations: [Role1731800867772, Permission1737758326811, RolePermissions1767439621713, UserRoles1767057541372,
        UserPermissions1767434295157, Buildings1762618117246, Users1762634123551, Institutions1766925750381, Faculties1766925853555,
        DepartmentsAcademics1767961580049, Teachers1767965781165, Programs1766934920847
    ],

    synchronize: false,
    logging: false,
})