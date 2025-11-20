import { Roles } from "../../../entities/models/Roles.models";

export const seederRoles = async () => {
    const roles = [
        "superAdmin",
        "admin",
        "moderator",
        "user"
    ];
    for (const name of roles) {
        const role = Roles.create({ name });
        await role.save();
    }
};
