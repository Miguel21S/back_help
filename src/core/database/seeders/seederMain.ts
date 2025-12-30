import { AppDataSource } from "../db";
import { seederPermissions, seederPermissionsRoles, seederRoles, seederUserRoles } from "./seederRoles";
import { seederBuildings } from "./seederBuildings";
import { seederUsers } from "./seederUsers";

export const runSeeders = async () => {
     console.log("Iniciando seeders...");

    try {
        await AppDataSource.initialize();
        console.log("Conectado a la base de datos.");

        await seederRoles();
        console.log("Roles listos");
        
        await seederPermissions();
        console.log("Roles permisión listos");

        await seederPermissionsRoles();
        console.log("Permisión roles listos");
        
        await seederBuildings();
        console.log("Buildings listos");
        
        await seederUsers();
        console.log("SuperAdmin y Usuarios aleatorios listos");
        
        await seederUserRoles();
        console.log("User roles listos");
        
        console.log("Seeders ejecutados con éxito");

    } catch (error) {
        console.error("ERROR en seeders:", error);
    } finally {
        await AppDataSource.destroy();
        console.log("Conexión cerrada");
    }
};
runSeeders()