import { NextFunction, Request, Response } from "express"
import { createUsersPDF } from "./genereteUsersPDF"
import { authorizationError, notFoundError } from "../../core/utils/errorStatusCodes"
import { Users } from "../../entities/models/roles_users_permission/Users.model"

//////////////////       GENERETE PDF BY FILTER
const generetePdfByFilterUsersInSystem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roleName } = req.tokenData
        let {
            nationality, birthDate, startBirthDate, endBirthDate,
            date_entry_apartment, startDate_entry_apartment,
            endDate_entry_apartment, gender, isActive, startLast_login,
            endLast_login
        } = req.body || {}

        if (roleName !== "superAdmin") { throw new authorizationError("Unauthorized access") }
        
        let findUsersGeneretePDF = Users.createQueryBuilder("users")

        if (!findUsersGeneretePDF) { throw new notFoundError("Not found Coutry") }
        
        if (nationality) {
            findUsersGeneretePDF.andWhere("users.nationality = :nationality", { nationality })
        }

        if (birthDate) {
            const start = new Date(birthDate);
            const end = new Date(birthDate);
            start.setHours(0, 0, 0, 0)
            end.setHours(23, 59, 59, 999)

            findUsersGeneretePDF.andWhere("users.date_born BETWEEN :start AND :end", { start, end })
        }

        if (startBirthDate && endBirthDate) {
            findUsersGeneretePDF.andWhere("users.date_born BETWEEN :startBirthDate AND :endBirthDate", { startBirthDate, endBirthDate })
        }

        if (date_entry_apartment) {
            findUsersGeneretePDF.andWhere("DATE(users.date_entry_apartment) = :date", { date: date_entry_apartment })
        }

        if (startDate_entry_apartment && endDate_entry_apartment) {
            const start = new Date(startDate_entry_apartment);
            const end = new Date(endDate_entry_apartment);

            end.setHours(23, 59, 59, 999);

            findUsersGeneretePDF.andWhere(
                "users.date_entry_apartment BETWEEN :start AND :end",
                { start, end }
            );
        }

        if (gender) {
            findUsersGeneretePDF.andWhere("users.gender = :gender", { gender })
        }

        if (typeof isActive === "string") {
            if (isActive.toLowerCase() === "activo") {
                findUsersGeneretePDF.andWhere( "users.isActive = :isActive", { isActive: true });
            }

            if (isActive.toLowerCase() === "inactivo") {
                findUsersGeneretePDF.andWhere(  "users.isActive = :isActive", { isActive: false });
            }
        }

        if (startLast_login && endLast_login) {
            const start = new Date(startLast_login)
            const end = new Date(endLast_login)

            start.setHours(0, 0, 0, 0)
            end.setHours(23, 59, 59, 999)
            findUsersGeneretePDF.andWhere("(users.last_login BETWEEN :start and :end)", { start, end })
        }
        const user = await findUsersGeneretePDF.getMany();
        // const usersFormatted = user.map(u => ({
        //     ...u,
        //     last_login: u.last_login
        //         ? new Date(u.last_login).toLocaleString("es-ES", {
        //             day: "2-digit",
        //             month: "2-digit",
        //             year: "numeric",
        //             hour: "2-digit",
        //             minute: "2-digit"
        //         })
        //         : ""
        // }));
        //// GENERETE PDF FROM SYSTEM USER LIST
        if (findUsersGeneretePDF) {
            const pdfDoc = createUsersPDF(user);

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=users.pdf");

            pdfDoc.pipe(res);
            pdfDoc.end();
            return;

        }

        res.status(200).json({
            success: true,
            mesagen: "Country found sucessfull",
            // data: findUsersGeneretePDF
        })

    } catch (error) {
        next(error)
    }
}

export {
    generetePdfByFilterUsersInSystem
};