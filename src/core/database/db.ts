import 'dotenv/config';
import "reflect-metadata";
import { DataSource } from "typeorm";

import { Buildings } from '../../entities/models/Buildings.model';

import { Roles } from '../../entities/models/admin/Roles.model';
import { Permission } from '../../entities/models/admin/Permission.model';
import { Role_permission } from '../../entities/models/admin/Role_permissions.model';
import { Users } from '../../entities/models/users_models/Users.model';
import { User_role } from '../../entities/models/users_models/User_roles.model';
import { User_permission } from '../../entities/models/users_models/User_permission';
import { Institution } from '../../entities/models/admin_institutions_models/Institutions.model';
import { Faculty } from '../../entities/models/admin_institutions_models/Faculty.model';
import { Departments_academics } from '../../entities/models/admin_institutions_models/Departments_academics.model';
import { Teachers } from '../../entities/models/admin_institutions_models/Teachers.model';
import { Programs } from '../../entities/models/admin_institutions_models/Programs.model';
import { Employees } from '../../entities/models/admin_institutions_models/Employees.models';
import { Students } from '../../entities/models/students_models/students.models';
import { Subjects } from '../../entities/models/academic_models/subjects.models';
import { Courses } from '../../entities/models/academic_models/Courses.models';
import { Classrooms } from '../../entities/models/academic_models/Classrooms.models';
import { Laboratories } from '../../entities/models/academic_models/Laboratories.models';
import { Groups } from '../../entities/models/academic_models/Groups.models';
import { Groups_shedules } from '../../entities/models/academic_models/Groups_shedules.models';
import { Subject_laboratories } from '../../entities/models/academic_models/Subject_laboratories.models';
import { Teacher_groups } from '../../entities/models/academic_models/Teacher_groups.models';
import { Student_subjects } from '../../entities/models/students_models/Student_subjects.models';
import { Student_laboratories } from '../../entities/models/students_models/Student_laboratories.models';
import { Student_groups } from '../../entities/models/students_models/Student_groups.models';


import { Role1731800867772 } from './migrations/admin/1731800867772-role';
import { Permission1737758326811 } from './migrations/admin/1737758326811-permission';
import { RolePermissions1767439621713 } from './migrations/admin/1767439621713-role_permissions';
import { Users1762634123551 } from './migrations/users_migrations/1762634123551-users';
import { UserRoles1767057541372 } from './migrations/users_migrations/1767057541372-user_roles';
import { UserPermissions1767434295157 } from './migrations/users_migrations/1767434295157-user_permissions';
import { Institutions1766925750381 } from './migrations/admin_institutions_migrations/1766925750381-institutions';
import { Faculties1766925853555 } from './migrations/admin_institutions_migrations/1766925853555-faculties';
import { DepartmentsAcademics1767961580049 } from './migrations/admin_institutions_migrations/1767961580049-departments_academics';
import { Teachers1767965781165 } from './migrations/admin_institutions_migrations/1767965781165-teachers';
import { Programs1766934920847 } from './migrations/admin_institutions_migrations/1766934920847-programs';
import { Employees1766926301953 } from './migrations/admin_institutions_migrations/1766926301953-employees';
import { Students1768495243875 } from './migrations/students_migrations/1768495243875-students';
import { Subjects1768495829148 } from './migrations/academic_migrations/1768495829148-subjects';
import { Courses1768497803067 } from './migrations/academic_migrations/1768497803067-courses';
import { Laboratories1768497845536 } from './migrations/academic_migrations/1768497845536-laboratories';
import { Groups1768517515202 } from './migrations/academic_migrations/1768517515202-groups';
import { GroupsShedules1768497880040 } from './migrations/academic_migrations/1768497880040-groups_shedules';
import { SubjectLaboratories1768516365079 } from './migrations/academic_migrations/1768516365079-subject_laboratories';
import { TeacherGroups1768518012692 } from './migrations/academic_migrations/1768518012692-teacher_groups';
import { StudentSubjects1768516032328 } from './migrations/students_migrations/1768516032328-student_subjects';
import { StudentLaboratories1768516224496 } from './migrations/students_migrations/1768516224496-student_laboratories';
import { StudentGroups1768517870958 } from './migrations/students_migrations/1768517870958-student_groups';

import { Buildings1762618117246 } from './migrations/1762618117246-buildings';

export const AppDataSource = new DataSource({
    type: "mysql",
    // host: process.env.DB_HOST || "localhost",
    host: process.env.DB_HOST || "database",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "2511",
    database: process.env.DB_DATABASE || "help_me_dev",

    entities: [Roles, Permission, Role_permission, User_role, Buildings, Users,
        User_permission, Institution, Faculty, Departments_academics, Teachers, Programs, Employees,
        Students, Subjects, Courses, Classrooms, Laboratories, Groups, Groups_shedules, Subject_laboratories,
        Teacher_groups, Student_subjects, Student_laboratories, Student_groups
    ],

    migrations: [Role1731800867772, Permission1737758326811, RolePermissions1767439621713, UserRoles1767057541372,
        UserPermissions1767434295157, Buildings1762618117246, Users1762634123551, Institutions1766925750381, Faculties1766925853555,
        DepartmentsAcademics1767961580049, Teachers1767965781165, Programs1766934920847, Employees1766926301953, Students1768495243875,
        Subjects1768495829148, Courses1768497803067, Laboratories1768497845536, Groups1768517515202, GroupsShedules1768497880040,
        SubjectLaboratories1768516365079, TeacherGroups1768518012692, StudentSubjects1768516032328, StudentLaboratories1768516224496,
        StudentGroups1768517870958
    ],

    synchronize: false,
    logging: false,
})