import { NextFunction, Request, Response } from "express";
import { authorizationError, badRequestError, conflictError, notFoundError } from "../../core/utils/errorsStatusCodes";
import { Buildings } from "../models/Buildings.models";
import { Not } from "typeorm";
import { Users } from "../models/Users.models";
import { createBuildingPDF } from "../../reports/genereteBuildingsPDF";

const createBuilding = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new badRequestError("El body está vacío");
        }

        const requiredFields = ["address", "number_build", "country", "province", "city", "postal_code", "quantity_apartment", "floor_number", "build_type"];
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
                address: req.body.address,
                number_build: req.body.number_build,
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
                address: true,
                number_build: true,
                country: true,
                province: true,
                city: true,
                postal_code: true,
                build_type: true,
                quantity_apartment: true,
                floor_number: true,
            }
        })

        //// GENERETE PDF FROM SYSTEM BUILDING LIST
        if (req.query.pdf === "true") {
            const pdfDoc = createBuildingPDF(buildings);

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=buildingInfo.pdf");

            pdfDoc.pipe(res);
            pdfDoc.end();
            return;
        }
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

        const building = await Buildings.createQueryBuilder("building")
            .leftJoinAndSelect("building.users", "users")
            .where("building.id = :id", { id: building_id })
            .select([
                "building.id",
                "building.address",
                "building.number_build",
                "building.country",
                "building.province",
                "building.city",
                "building.postal_code",
                "building.build_type",
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
        const building_id = req.params.id;
        const { address, number_build, country, province, city, postal_code, quantity_apartment, floor_number, build_type } = req.body;

        if (isNaN(Number(building_id)) || Number(building_id) !== parseInt(building_id)) { throw new badRequestError("Invalid building ID") }

        const building = await Buildings.findOne({ where: { id: parseInt(building_id) } });

        if (!building) { throw new notFoundError("Building not found") }

        if (address || number_build || postal_code || city || province) {
            const existBuilding = await Buildings.findOne({
                where: {
                    address: address,
                    number_build: number_build,
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
                address,
                number_build,
                country,
                province,
                city,
                postal_code,
                quantity_apartment,
                floor_number,
                build_type,
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
        const building_id = req.params.id;

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
        const { roleId, roleName } = req.tokenData;
        const building_id = Number(req.params.id);

        if (isNaN(building_id)) { throw new badRequestError("Invalid building ID") }

        const building = await Buildings.findOne({ where: { id: building_id } });

        if (!building?.id) { throw new notFoundError("Building not found") }
        console.log("found Building id:", building.id);

        const totalUsers = await Users.count({ where: { building: { id: building.id } } });
        console.log("Total users in building:", totalUsers);

        const userCount = await Users.createQueryBuilder("users")
            .leftJoinAndSelect("users.building", "building")
            .leftJoinAndSelect("users.role", "role")
            .where("building.id = :id", { id: building_id })
            .select([
                "users.id",
                "users.name",
                "users.email",
                "users.gender",
                "users.building_id",
                "role.name"
            ])
            .getMany()
        console.log("User: ", userCount);

        const usersByGender = await Users.createQueryBuilder("users")
            .leftJoin("users.building", "building")
            .select("users.gender", "gender")
            .addSelect("COUNT(users.id)", "count")
            .where("building.id = :id", { id: building_id })
            .groupBy("users.gender")
            .getRawMany();
        console.log("User count", usersByGender);

        const usersByrole = await Users.createQueryBuilder("users")
            .leftJoin("users.building", "building")
            .leftJoin("users.role", "role")
            .select("role.name", "roleName")
            .addSelect("COUNT(users.id)", "count")
            .where("building.id = :id", { id: building_id })
            .groupBy("role.name")
            .getRawMany();
        console.log("User count by role", usersByrole);

        const totalUsersByAge = await Users.createQueryBuilder("users")
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
                building: building.address + " " + building.number_build,
                totalUsers,
                userCount,
                usersByGender,
                totalUsersByAge,
                usersByrole,
            },
        });

    } catch (error) {
        next(error);
    }
}

const dashboardBuildig = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const {roleId, roleName } = req.tokenData;

        if(!roleId && roleName !== "superAdmin"){throw new authorizationError("Unauthorized access")}

        const totalBuilding = await Buildings.count()
        console.log("Total building: ", totalBuilding)

        const totalBuildingByCountry = await Buildings.createQueryBuilder("building")
            .select("building.country", "country")
            .addSelect("COUNT(building.id)", "count")
            .groupBy("country")
            .getRawMany()
        console.log("Total building by country: ", totalBuildingByCountry)
        
        res.status(200).json({
            success: true,
            mensage: "Buildings",
            data: {
                totalBuilding,
                totalBuildingByCountry
            }
        })
    } catch (error) {
        next(error);
        
    }
} 

/////////////////////   EXPORTING ALL THE METHODS
export {
    createBuilding, getAllBuildings, getBuildingById, updateBuildingById,
    deleteBuildingById, getfilterElementInBuilding, dashboardBuildig
};