import { NextFunction, Request, Response } from "express";
import { authorizationError, badRequestError, conflictError, notFoundError } from "../../core/utils/errorsStatusCodes";
import { Buildings } from "../models/Buildings.models";
import { Not } from "typeorm";
import { Users } from "../models/Users.models";
import { AppDataSource } from "../../core/database/db";

const createBuilding = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { roleName } = req.tokenData;

        if (
            roleName !== "superAdmin" && roleName !== "admin" &&
            roleName !== "AdminLocal" /* && roleName !== "moderator" */
        ) throw new authorizationError("Unauthorized access")

        if (!req.body || Object.keys(req.body).length === 0) {
            throw new badRequestError("El body está vacío");
        }
        const colp = ["address_line2", "last_maintenance", "services_available"];
        const requiredFields = [
            "address_line1", "country", "province", "city", "postal_code",
            "quantity_apartment", "floor_number", "build_type", "general_status"
        ];

        for (const field of requiredFields) {
            if (!req.body[field] || req.body[field].toString().trim() === "") {
                throw new badRequestError(`The ${field} field is mandatory and cannot be empty.`);
            }
        }

        // const normalizedInputAddress = normalizeVariable(req.body.address);
        // const normalizedInputNumber_build = normalizeVariable(req.body.number_build);
        // const normalizedInputPostal_code = normalizeVariable(req.body.postal_code);
        // const normalizedInputCity = normalizeVariable(req.body.city);
        // const normalizedInputProvince = normalizeVariable(req.body.province);

        const existingBuilding = await Buildings.findOne({
            where: {
                address_line1: req.body.address_line1,
                province: req.body.province,
                city: req.body.city,
                postal_code: req.body.postal_code,
            }
        })

        if (existingBuilding) {
            throw new conflictError("The building already exists in the database.")
        }

        const building = await Buildings.create(req.body).save();

        res.status(200).json({
            success: true,
            message: "Building created successfully",
            data: building,
        });

    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            return next(new conflictError("A building with the same address, number build, postal code, city, and province already exists."))
            // res.status(409).json({
            //     success: false,
            //     message: "Un edificio con la misma dirección, número, código postal, ciudad y provincia ya existe."
            // });
            // return;
        }
        next(error)
    }
}

/////////////////////   METHOD THAT SHOWS ALL THE BULDINGS
const getAllBuildings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const buildings = await Buildings.find({
            select: {
                id: true,
                address_line1: true,
                address_line2: true,
                country: true,
                province: true,
                city: true,
                postal_code: true,
                build_type: true,
                last_maintenance: true,
                general_status: true,
                services_available: true,
                quantity_apartment: true,
                floor_number: true,
            }
        })

        console.log(buildings);

        res.status(200).json({
            success: true,
            message: "Buildings retrieved successfully",
            data: buildings,
        });
    } catch (error) {
        next(error);
    }
}

/////////////////////   METHOD THAT SHOW THE BUILDING BY ID
const getBuildingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const building_id = Number(req.params.id);

        if (isNaN(building_id)) { throw new badRequestError("Invalid building ID") }

        /* const building = await Buildings.findOne({
            where: { id: building_id },
            relations: ['users'],
            select: {
                id: true,
                address: true,
                number_build: true,
                country: true,
                province: true,
                city: true,
                postal_code: true,
                build_type: true,
                quantity_apartment: true,
                floor_number: true,
                users: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        });

        if (!building) { throw new notFoundError("Building not found") }
        const buildusres = building.users.map(u => ({
            id: u.id,
            name: u.name,
            email: u.email
        })); */

        const building = await AppDataSource.getRepository(Buildings)
            .createQueryBuilder("building")
            .leftJoinAndSelect("building.users", "users")
            .where("building.id = :id", { id: building_id })
            .select([
                "building.id",
                "building.address_line1",
                "building.address_line2",
                "building.country",
                "building.province",
                "building.city",
                "building.postal_code",
                "building.build_type",
                "building.last_maintenance",
                "building.general_status",
                "building.services_available",
                "building.quantity_apartment",
                "building.floor_number",
                "users.id",
                "users.name",
                "users.email"
            ])
            .getOne();

        res.status(200).json({
            success: true,
            message: "Building retrieved successfully",
            data: building,
        });
        console.log(building);
    }
    catch (error) {
        next(error);
    }
}

/////////////////////   METHOD THAT UPDATE THE BUILDING BY ID
const updateBuildingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roleName } = req.tokenData
        const building_id = req.params.id;
        const {
            address_line1, address_line2, country, province, city, postal_code, quantity_apartment,
            floor_number, build_type, last_maintenance, general_status, services_available
        } = req.body;

        if (
            roleName !== "superAdmin" && roleName !== "admin" &&
            roleName !== "AdminLocal" /* && roleName !== "moderator" */
        ) throw new authorizationError("Unauthorized access")

        if (isNaN(Number(building_id)) || Number(building_id) !== parseInt(building_id)) { throw new badRequestError("Invalid building ID") }

        const building = await Buildings.findOne({ where: { id: parseInt(building_id) } });

        if (!building) { throw new notFoundError("Building not found") }

        if (address_line1 || postal_code || city || province) {
            const existBuilding = await Buildings.findOne({
                where: {
                    address_line1: address_line1,
                    province: province,
                    city: city,
                    postal_code: postal_code,
                    id: Not(building.id)
                }
            })

            if (existBuilding) {
                throw new conflictError("This building already exists in the database");
            }
        }

        await Buildings.update(
            { id: parseInt(building_id) },
            {
                address_line1,
                address_line2,
                country,
                province,
                city,
                postal_code,
                build_type,
                last_maintenance,
                general_status,
                services_available,
                quantity_apartment,
                floor_number,
            }
        );

        res.status(200).json({
            success: true,
            message: "Building updated successfully",
        });

    } catch (error) {
        next(error);
    }
}

/////////////////////   METHOD THAT DELETE THE BUILDING BY ID
const deleteBuildingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roleName } = req.tokenData
        const building_id = req.params.id;

        if (
            roleName !== "superAdmin" && roleName !== "admin" &&
            roleName !== "AdminLocal"/*  && roleName !== "moderator" */
        ) throw new authorizationError("Unauthorized access")

        if (isNaN(Number(building_id)) || Number(building_id) !== parseInt(building_id)) { throw new badRequestError("Invalid building ID") }

        const building = await Buildings.findOne({ where: { id: parseInt(building_id) } });

        if (!building) { throw new notFoundError("Building not found") }

        await Buildings.delete(building.id);

        res.status(200).json({
            success: true,
            message: "Building deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}

/////////////////////   METHODS FOR FILTERING BUILDING ELEMENTS BY ID
const getfilterElementInBuilding = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roleName } = req.tokenData;
        const building_id = Number(req.params.id);

        if (
            roleName !== "superAdmin" && roleName !== "admin" &&
            roleName !== "AdminLocal" /* && roleName !== "moderator" */
        ) throw new authorizationError("Unauthorized access")

        if (isNaN(building_id)) { throw new badRequestError("Invalid building ID") }

        const building = await Buildings.findOne({ where: { id: building_id } });

        if (!building?.id) { throw new notFoundError("Building not found") }
        console.log("found Building id:", building.id);

        const totalUsers = await Users.count({ where: { building: { id: building.id } } });
        console.log("Total users in building:", totalUsers);

        // const userCountInfoBuild = await AppDataSource.getRepository(Users);
        //     .createQueryBuilder("users")

        const userCountInfoBuild = await AppDataSource.getRepository(Users)
            .createQueryBuilder("users")
            .leftJoinAndSelect("users.building", "building")
            .leftJoinAndSelect("users.role", "role")
            .where("building.id = :id", { id: building_id })
            .select([
                "users.id",
                "users.name",
                "users.lastName",
                "users.email",
                "users.type_document",
                "users.number_document",
                "users.nationality",
                "users.gender",
                "users.building_id",
                "role.name"
            ])
            .getMany()
        console.log("User: ", userCountInfoBuild);

        const usersByGender = await AppDataSource.getRepository(Users)
            .createQueryBuilder("users")
            .leftJoin("users.building", "building")
            .select("users.gender", "gender")
            .addSelect("COUNT(users.id)", "count")
            .where("building.id = :id", { id: building_id })
            .groupBy("users.gender")
            .getRawMany();
        console.log("User count", usersByGender);

        const usersByrole = await AppDataSource.getRepository(Users)
            .createQueryBuilder("users")
            .leftJoin("users.building", "building")
            .leftJoin("users.role", "role")
            .select("role.name", "roleName")
            .addSelect("COUNT(users.id)", "count")
            .where("building.id = :id", { id: building_id })
            .groupBy("role.name")
            .getRawMany();
        console.log("User count by role", usersByrole);

        const totalUsersByAge = await AppDataSource.getRepository(Users)
            .createQueryBuilder("users")
            .leftJoin("users.building", "building")
            // .select("FLOOR(DATEDIFF(CURDATE(), users.date_born) / 365.25)", "age")
            .select("TIMESTAMPDIFF(YEAR, users.date_born, CURDATE())", "age")
            .addSelect("users.gender", "gender")
            .addSelect("COUNT(users.id)", "count")
            .where("building.id = :id", { id: building_id })
            .groupBy("age")
            .addGroupBy("users.gender")
            .getRawMany();
        console.log("User count by age", totalUsersByAge);

        const [usersArray, countUsers] = await Users.findAndCount({
            where: { building: { id: building.id } },
        });

        res.status(200).json({
            success: true,
            message: "Users count retrieved successfully",
            data: {
                building_id,
                address: building.address_line1,
                address2: building.address_line2,
                totalUsers,
                userCountInfoBuild,
                usersByGender,
                totalUsersByAge,
                usersByrole,
            },
        });

    } catch (error) {
        next(error);
    }
}

const dashboardBuildig = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roleName } = req.tokenData;

        if (roleName !== "superAdmin") { throw new authorizationError("Unauthorized access") }

        const [
            totalBuilding,
            totalBuildingByCountry,
            totalBuildingsByCountryAndProvince,
            totalUsersBuildingsByCountryAndProvinceActive
        ] = await Promise.all([
            Buildings.count(),
            Buildings.createQueryBuilder("building")
                .select("building.country", "country")
                .addSelect("COUNT(building.id)", "count")
                .groupBy("country")
                .getRawMany(),
            Buildings.createQueryBuilder("building")
                .select("building.country", "country")
                .addSelect("building.province", "province")
                .addSelect("building.city", "city")
                .addSelect("building.quantity_apartment", "quantity_apartment")
                .addSelect("COUNT(building.id)", "count")
                .groupBy("country")
                .addGroupBy("province")
                .addGroupBy("city")
                .addGroupBy("quantity_apartment")
                .getRawMany(),
            Buildings.createQueryBuilder("building")
                .select("building.country", "country")
                .addSelect("building.province", "province")
                .addSelect("building.city", "city")
                .addSelect("building.quantity_apartment", "quantity_apartment")
                .addSelect("building.general_status", "general_status")
                .addSelect("COUNT(building.id)", "count")
                .groupBy("country")
                .addGroupBy("province")
                .addGroupBy("city")
                .addGroupBy("quantity_apartment")
                .addGroupBy("general_status")
                .getRawMany()

        ])
        console.log("Total building: ", totalBuilding)
        console.log("Total building by country: ", totalBuildingByCountry)
        console.log("totalBuildingsByCountryAndProvince: ", totalBuildingsByCountryAndProvince)
        console.log("totalBuildingsByCountryAndProvince: ", totalUsersBuildingsByCountryAndProvinceActive)

        res.status(200).json({
            success: true,
            mensage: "Buildings",
            data: {
                totalBuilding,
                totalBuildingByCountry,
                totalBuildingsByCountryAndProvince,
                totalUsersBuildingsByCountryAndProvinceActive
            }
        })
    } catch (error) {
        next(error);

    }
}

/////////////////////   EXPORTING ALL THE METHODS
export {
    createBuilding, getAllBuildings, getBuildingById, updateBuildingById,
    deleteBuildingById, getfilterElementInBuilding, dashboardBuildig,
};