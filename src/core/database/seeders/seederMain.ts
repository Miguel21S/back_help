import { AppDataSource } from "../db";
import { seederRoles } from "./seederRoles";
import { seederBuildings } from "./seederBuildings";
import { seederUsers } from "./seederUsers";

export const runSeeders = async () => {
     console.log("Iniciando seeders...");

    try {
        await AppDataSource.initialize();
        console.log("Conectado a la base de datos.");

        await seederRoles();
        console.log("Roles listos");
        
        await seederBuildings();
        console.log("Buildings listos");
        
        await seederUsers();
        console.log("SuperAdmin y Usuarios aleatorios listos");

        console.log("Seeders ejecutados con éxito");

    } catch (error) {
        console.error("ERROR en seeders:", error);
    } finally {
        await AppDataSource.destroy();
        console.log("Conexión cerrada");
    }
};
runSeeders()