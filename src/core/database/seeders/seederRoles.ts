import { Roles } from "../../../entities/models/admin/Roles.model";
import { User_role } from "../../../entities/models/users_models/User_roles.model";
import { Permission } from "../../../entities/models/admin/Permission.model";
import { Role_permission } from "../../../entities/models/admin/Role_permissions.model";

import { Users } from "../../../entities/models/users_models/Users.model";

export const seederRoles = async () => {
    const roles = [
        /* Roles de sistema */        
        { name: "superAdmin", description: "Control total del sistema" },
        { name: "admin", description: "Administrador del sistema" },
        { name: "user", description: "Usuario estándar" },
        
        /* Roles académicos base */
        { name: "student", description: "Estudiante regular" },
        { name: "teacher", description: "Docente" },
        
        /* Roles académicos funcionales */
        { name: "class_leader", description: "Jefe de turma / representante de clase" },
        { name: "academic_coordinator", description: "Coordinador académico" },
        { name: "faculty_manager", description: "Gestor de facultad" },
        { name: "dean", description: "Decano de facultad" },

        /* Roles administrativos Roles de apoyo académico */
        { name: "student_services", description: "Servicio de apoyo al alumnado" },
    ];
    for (const roleData of roles) {
        const exists = await Roles.findOne({ where: { name: roleData.name } });
        if (!exists) {
            const roleEntity = Roles.create({ name: roleData.name, description: roleData.description });
            await roleEntity.save();
        }
    }
};

export const seederPermissions = async () => {
    const permissions = [
        { name: "manage_users", description: "Crear, editar y eliminar usuarios" },
        { name: "manage_faculties", description: "Administrar facultades" },
        { name: "view_reports", description: "Acceder a reportes del sistema" },
        { name: "coordinate_zone", description: "Coordinar zonas académicas" },
        { name: "orient_students", description: "Orientar a estudiantes" },
        { name: "dean_management", description: "Funciones del decanato" },
        { name: "assign_schedules", description: "Asignar horarios académicos" },
        { name: "approve_documents", description: "Aprobar documentos oficiales" },
        { name: "manage_schedules", description: "Gestión avanzada de horarios" },

    ];

    for (const perm of permissions) {
        const exists = await Permission.findOne({ where: { name: perm.name } });
        if (!exists) {
            await Permission.save({ name: perm.name, description: perm.description });
        }
    }
};

export const seederPermissionsRoles = async () => {
    const roleMap = {
        superAdmin: [
            "manage_users",
            "manage_faculties",
            "view_reports", 
            "coordinate_zone",
            "orient_students",
            "dean_management",
            "assign_schedules",
            "approve_documents",
            "manage_schedules",
        ],
        admin: [
            "manage_users",
            "manage_faculties",
            "view_reports",
        ],
        student: [
            "view_reports",
        ],
        teacher: [
            "assign_schedules",
            "approve_documents",
        ],
        user: [],
    };

    for (const [roleName, permissions] of Object.entries(roleMap)) {
        const role = await Roles.findOne({ where: { name: roleName } });
        if (!role) continue;

        for (const permName of permissions) {
            const permission = await Permission.findOne({ where: { name: permName } });
            if (!permission) continue;

            const exists = await Role_permission.findOne({
                where: {
                    role_id: role.id,
                    permission_id: permission.id,
                },
            });

            if (!exists) {
                await Role_permission.save(
                    Role_permission.create({
                        role_id: role.id,
                        permission_id: permission.id,
                    })
                );
            }
        }
    }
}

export const seederUserRoles = async () => {
    const superAdminRole = await Roles.findOne({ where: { name: "superAdmin" } });
    const userRole = await Roles.findOne({ where: { name: "user" } });

    if (!superAdminRole || !userRole) return;

    const users = await Users.find();

    for (const user of users) {
        const role =
            user.email === "superadmin@gmail.com" ? superAdminRole : userRole;

        const exists = await User_role.findOne({
            where: {
                user_id: user.id,
                role_id: role.id,
            },
        });

        if (!exists) {
            await User_role.save(
                User_role.create({
                    user_id: user.id,
                    role_id: role.id,
                })
            );
        }
    }
}


/*  "AdminLocal", "moderator",  "ModeradorUser",  */