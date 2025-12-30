import { Permission } from "../../../entities/models/Permission.model";
import { Role_permission } from "../../../entities/models/Role_permissions.model";
import { Roles } from "../../../entities/models/Roles.model";
import { User_role } from "../../../entities/models/User_roles.model";
import { Users } from "../../../entities/models/Users.model";

export const seederRoles = async () => {
    const roles = [
        { name: "super_admin", description: "Control total del sistema" },
        { name: "admin", description: "Administrador del sistema" },
        { name: "user", description: "Usuario estándar" },
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
        { name: "gestionar_usuarios", description: "Crear, editar y eliminar usuarios" },
        { name: "gestionar_facultades", description: "Administrar facultades" },
        { name: "ver_reportes", description: "Acceder a reportes del sistema" },
        { name: "coordinar_zona", description: "Coordinar zonas académicas" },
        { name: "orientar_estudiantes", description: "Orientar a estudiantes" },
        { name: "decanato_gestion", description: "Funciones del decano" },
        { name: "asignar_horarios", description: "Asignar horarios académicos" },
        { name: "aprobar_documentos", description: "Aprobar documentos oficiales" },
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
        super_admin: [
            "gestionar_usuarios",
            "gestionar_facultades",
            "ver_reportes",
            "coordinar_zona",
            "orientar_estudiantes",
            "decanato_gestion",
            "asignar_horarios",
            "aprobar_documentos",
        ],
        admin: [
            "gestionar_usuarios",
            "gestionar_facultades",
            "ver_reportes",
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
    const superAdminRole = await Roles.findOne({ where: { name: "super_admin" } });
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