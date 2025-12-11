
import { NextFunction, Request, Response } from "express";
import { Users } from "../models/Users.models";
import { authorizationError, badRequestError, conflictError, notFoundError } from "../../core/utils/errorsStatusCodes";
import { Not } from "typeorm";
import { createUsersPDF } from "../../reports/genereteUserPDF/genereteUsersPDF";
import { Buildings } from "../models/Buildings.models";
import bcrypt from 'bcryptjs'
import { AppDataSource } from "../../core/database/db";
// import { Imagens } from "../models/Imagens.models";

////////////////////  GET ALL USERS
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleName = req.tokenData.roleName;

        if (roleName !== "superAdmin") { throw new authorizationError("Unauthorized access") }

        const users = await Users.find({
            select: {
                id: true,
                name: true,
                lastName: true,
                email: true,
                type_document: true,
                number_document: true,
                avatar: true,
                isActive: true,
                phone: true,
                date_born: true,
                gender: true,
                nationality: true,
                special_situation: true,
                date_entry_apartment: true,
                created_date: true,
                building_id: true,
                role_id: true,
                last_login: true
            },
        });

        //// GENERETE PDF FROM SYSTEM USER LIST
        if (req.query.pdf === "true") {
            const pdfDoc = createUsersPDF(users);

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=usersInfo.pdf");

            pdfDoc.pipe(res);
            pdfDoc.end();
            return;
        }
        console.log(users);

        res.status(200).json({
            success: true,
            message: "list of users successfully found",
            data: users,
        });

    } catch (error) {
        next(error);
    }
}

////////////////////  GET USER BY ID
const updateUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roleId, roleName } = req.tokenData;
        const user_id = req.params.id;
        const {
            name, lastName, email, phone, date_born, gender, nationality,
            building_id, special_situation, date_entry_apartment,
            type_document, number_document
        } = req.body;

        if (isNaN(parseInt(user_id))) { throw new badRequestError("Invalid user ID") }

        const user = await Users.findOne({ where: { id: parseInt(user_id) } });
        if (!user) { throw new notFoundError('User not found') }

        if (user.id !== roleId && roleName !== 'superAdmin') { throw new authorizationError("Unauthorized access") }

        if (email) {
            const existEmail = await Users.findOne({
                where: {
                    email: email,
                    id: Not(user.id)
                }
            });

            if (existEmail) {
                throw new conflictError("This email already exists in the database");
            }
        }

        let fieldsToUpdate: any = {
            name,
            lastName,
            email,
            phone,
            date_born,
            gender,
            nationality,
            building_id,
            special_situation,
            date_entry_apartment,
            type_document,
            number_document,

        };

        Object.keys(fieldsToUpdate).forEach(key => {
            if (fieldsToUpdate[key] === undefined) {
                delete fieldsToUpdate[key];
            }
        });

        if (fieldsToUpdate.building_id) {
            const buildingExists = await Buildings.findOne({ where: { id: fieldsToUpdate.building_id } });
            if (!buildingExists) throw new notFoundError("Building id not found");
        }


        const upd = await Users.createQueryBuilder()
            .update(Users)
            .set(fieldsToUpdate)
            .where("id = :id", { id: user_id })
            .execute()
        console.log("Upd: ", upd)

        // Users.update(user_id,
        //     {
        //         id: parseInt(user_id),
        //         name,
        //         lastName,
        //         date_born,
        //         gender,
        //         nationality,
        //         building_id,
        //         special_situation,
        //         phone,
        //         email,
        //         date_entry_apartment,
        // type_document,
        //     number_document
        //     }
        // )

        res.status(200).json({
            success: true,
            message: "User updated successfully",
        });
        return;
    } catch (error) {
        next(error);
    }
}

////////////////////  GET USER BY ID 
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roleName } = req.tokenData;
        const user_id = req.params.id;

        if (roleName !== 'superAdmin') { throw new authorizationError("Unauthorized access") }

        if (isNaN(Number(user_id)) || Number(user_id) !== parseInt(user_id)) { throw new badRequestError("Invalid user ID") }

        const user = await Users.findOne({
            where: {
                id: parseInt(user_id)
            },
            select: {
                id: true,
                name: true,
                lastName: true,
                email: true,
                phone: true,
                date_born: true,
                gender: true,
                nationality: true,
                building_id: true,
                special_situation: true,
                date_entry_apartment: true,
                type_document: true,
                number_document: true,
                avatar: true,
                isActive: true,
                last_login: true
            }
        });

        if (!user) { throw new notFoundError('User not found') }

        res.status(200).json({
            success: true,
            message: "User successfully found",
            data: user,
        })
    } catch (error) {
        next(error);
    }
}

////////////////////  DELETE USER BY ID
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roleId, roleName } = req.tokenData;
        const user_id = req.params.id;

        if (roleName !== 'superAdmin') { throw new authorizationError('Unauthorized access') }

        if (isNaN(Number(user_id)) || Number(user_id) !== parseInt(user_id)) { throw new badRequestError("Invalid user ID") }

        const user = await Users.findOne({
            where: {
                id: parseInt(user_id)
            },
            select:
                ["id", "role_id"]
        });

        if (!user) { throw new notFoundError("User not found") }

        if (user.id === roleId || user.role_id === 1) {
            throw new authorizationError("superAdministrators cannot delete themselves or other superAdministrators")
        }

        const removeUser: any = await Users.delete(user?.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: removeUser,
        })
    } catch (error) {
        next(error);
    }
}

///////////////////      COMPARE EMAIL USERS
const compareEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const email = req.query.email as string;

        const userEmail = await Users.findOne({ where: { email } });

        if (userEmail) {
            res.status(200).json({ success: true, exists: true, message: "Email ya registrado" });
            return
        }

        res.status(200).json({
            success: true,
            exists: false,
            message: "Email válido"
        });
    } catch (error) {
        next(error);
    }
}

////////////////////////     METHOD TO CHECK WHETHER THE USER'S EMAIL ADDRESS MATCHES THE EMAIL ADDRESS RELATED TO THE DATA TO BE UPDATED
const CheckEmailUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            throw new badRequestError("Invalid user ID");
        }

        const findUser = await Users.findOne({ where: { id: id } })
        if (!findUser?.id) { throw new notFoundError("User not found") }

        res.status(200).json({
            success: true,
            email: findUser?.email
        })
    } catch (error) {
        next(error)
    }
}

///////////////////      GET THE TOTAL NUMBER OF USERS IN THE SYSTEM
const dashboardUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleName = req.tokenData.roleName;

        if (roleName !== 'superAdmin') { throw new authorizationError("Unauthorized access") }

        const AGE_CASE = `
            CASE
                WHEN users.date_born IS NULL THEN 'SIN FECHA'
                WHEN TIMESTAMPDIFF(YEAR, users.date_born, CURDATE()) < 18 THEN '<18'
                WHEN TIMESTAMPDIFF(YEAR, users.date_born, CURDATE()) BETWEEN 18 AND 25 THEN '18-25'
                WHEN TIMESTAMPDIFF(YEAR, users.date_born, CURDATE()) BETWEEN 26 AND 35 THEN '26-35'
                WHEN TIMESTAMPDIFF(YEAR, users.date_born, CURDATE()) BETWEEN 36 AND 45 THEN '36-45'
                WHEN TIMESTAMPDIFF(YEAR, users.date_born, CURDATE()) BETWEEN 46 AND 60 THEN '46-60'
                ELSE '>60'
            END
        `;

        const totalUsersSystem = await Users.count();

        const userGenderCount = await Users.createQueryBuilder("users")
            .select("users.gender", "gender")
            .addSelect("COUNT(users.id)", "count")
            .groupBy("users.gender")
            .getRawMany();
        console.log("Count gender:", userGenderCount);

        const totalUsersForRol = await Users.createQueryBuilder("users")
            .leftJoin("users.role", "role")
            .select("role.name", "roleName")
            .addSelect("COUNT(users.id)", "count")
            .groupBy("role.name")
            .getRawMany();
        console.log("Total users for rol:", totalUsersForRol);

        const usersForAge = await Users.createQueryBuilder("users")
            .select("TIMESTAMPDIFF(YEAR, users.date_born, CURDATE())", "age")
            .addSelect("COUNT(users.id)", "count")
            .groupBy("age")
            .orderBy("age")
            .getRawMany();
        console.log("Users for age group:", usersForAge);

        const usersForAgeGroup = await Users.createQueryBuilder("users")
            .select(AGE_CASE, "group_age")
            .addSelect("COUNT(users.id)", "count")
            .groupBy("group_age")
            .orderBy("group_age")
            .getRawMany();
        console.log("Users for age group formatted:", usersForAgeGroup);

        const userIsActive = await AppDataSource.getRepository(Users)
        .createQueryBuilder("user")
        .select("user.isActive", "isActive")
        .addSelect("COUNT(user.id)", "count")
        .groupBy("isActive")
        .getRawMany()
        console.log("ACTIVE:", userIsActive)

        const usersForAgeAndGenderGroup = await Users.createQueryBuilder("users")
            // .select(AGE_CASE, "group_age")
            // .addSelect("users.gender", "gender")
            // .addSelect("COUNT(users.id)", "count")
            // .where("users.date_born IS NOT NULL")
            // .groupBy("users.gender")
            // .addGroupBy("group_age")
            // .orderBy("group_age")
            // .getRawMany();

            .select(AGE_CASE, "group_age")
            .addSelect("users.gender", "gender")
            .addSelect("COUNT(users.id)", "count")
            .groupBy("group_age, users.gender WITH ROLLUP")
            .getRawMany();
        console.log("Users for age group formatted:", usersForAgeAndGenderGroup);

        const usersForNationality = await Users.createQueryBuilder("users")
            .select("users.nationality", "nationality")
            .addSelect("COUNT(users.id)", "count")
            .groupBy("nationality")
            .getRawMany();
        console.log("Users for nationality", usersForNationality);


        res.status(200).json({
            success: true,
            mensage: "Total users for rol",
            data: {
                totalUsersSystem,
                userGenderCount,
                totalUsersForRol,
                usersForAge,
                usersForAgeGroup,
                usersForAgeAndGenderGroup,
                usersForNationality,
                userIsActive
            }
        })
    } catch (error) {
        next(error)
    }
}

////////////////////     GET MY PROFILE
const getPrifile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = req.tokenData.roleId;

        const user = await Users.findOne({
            where: { id: user_id },
            select: {
                id: true,
                name: true,
                lastName: true,
                date_born: true,
                gender: true,
                email: true,
                phone: true,
                nationality: true,
                building_id: true,
                special_situation: true,
                date_entry_apartment: true,
            }
        })

        if (!user) { throw new notFoundError("User not found") }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
}

const getMyAllImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /*  const user_id = req.tokenData.roleId;
 
         const getImage = await Imagens.find({
             // where: { id: user_id },
             select: {
                 id: true,
                 entity_type: true,
                 entity_id: true,
                 image_url: true,
                 description: true,
             }
         })
 
         const baseUrl = `${req.protocol}://${req.get('host')}`;
         const updatedImages = getImage.map(image => ({
             ...image,
             image_url: `${baseUrl}${image.image_url}`, // Convierte rutas relativas a absolutas
         }));
         const id_ent = updatedImages.filter(imgs => {
             return imgs.entity_id === user_id
         })
 
         res.status(200).json({
             success: true,
             message: "Images retrieved successfully",
             data: id_ent
         }) */
    } catch (error) {
        next(error)
    }
}

////////////////////     UPDATE PASSWORD
const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roleId, roleName } = req.tokenData;
        const { password, newPassword } = req.body;
        const id = req.params.id;

        const user = await Users.findOne({ where: { id: parseInt(id) } })
        if (!user?.id) {
            throw new notFoundError("User not found")
        }

        if (roleId != user?.id || roleName != "superAdmin") { throw new authorizationError('Unauthorized access') }

        if (password !== newPassword) { throw new badRequestError("Passwords do not match") }

        const validPassword = /^(?=.*\d)(?=.*[!\"#\$%&'()*+,-./:;<=>?@[\\\]^_])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/
        if (password.length < 8) { throw new notFoundError('Password must be longer than 8 characters') }

        if (!validPassword.test(password)) {
            throw new notFoundError('Password must include at least one digit, one special character, one uppercase letter, one lowercase letter, and no spaces.')
        }

        const passwordEcrypted = bcrypt.hashSync(password, 10)

        await Users.update(id,
            {
                id: parseInt(id),
                password: passwordEcrypted
            }
        )

        res.status(200).json({
            success: true,
            message: "User updated successfully",
        })
    } catch (error) {
        next(error)
    }
}
export {
    getUsers, getPrifile, getUserById, deleteUser, updateUsers,
    compareEmail, CheckEmailUser, dashboardUsers, getMyAllImage,
    changePassword
};