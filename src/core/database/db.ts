import 'dotenv/config';
import "reflect-metadata";
import { DataSource } from "typeorm";

import { Role1731800867772 } from './migrations/1731800867772-role';
import { Buildings1762618117246 } from './migrations/1762618117246-buildings';
import { Users1762634123551 } from './migrations/1762634123551-users';
import { Permission1737758326811 } from './migrations/1737758326811-permission';

import { Roles } from '../../entities/models/Roles.model';
import { Users } from '../../entities/models/Users.model';
import { Permission } from '../../entities/models/Permission.model';
import { Buildings } from '../../entities/models/Buildings.model';

export const AppDataSource = new DataSource({
    type: "mysql",
    // host: process.env.DB_HOST || "localhost",
    host: process.env.DB_HOST || "database",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "2511",
    database: process.env.DB_DATABASE || "help_me_dev",

    entities: [Roles, Buildings, Users, Permission,
    ],

    migrations: [Role1731800867772,  Buildings1762618117246, Users1762634123551, Permission1737758326811,
    ],

    synchronize: false,
    logging: false,
})