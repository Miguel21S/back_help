import { NextFunction, Request, Response } from "express";
import { authorizationError, notFoundError } from "../../core/utils/errorsStatusCodes";
import { Buildings } from "../../entities/models/Buildings.models";
import { createBuildingPDF } from "./genereteBuildingsPDF";

///////////////////// GENERETE PDF BY FILTER
const generetePdfByFilterBuildInSystem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roleName } = req.tokenData;
        const { country, province } = req.body

        if (roleName !== "superAdmin") { throw new authorizationError("Unauthorized access") }

        const findBuildingGeneretePDF = Buildings.createQueryBuilder("builds")
        if (!findBuildingGeneretePDF) throw new notFoundError("Not found Building")

        if (country) {
            findBuildingGeneretePDF.andWhere("builds.country = :country", { country })
        }

        if (country && province) {
            findBuildingGeneretePDF.andWhere("builds.country = :country AND builds.province = :province", { country, province })
        }

        const build = await findBuildingGeneretePDF.getMany()
        //// GENERETE PDF FROM SYSTEM BUILDING LIST
        if (findBuildingGeneretePDF) {
            const pdfDoc = createBuildingPDF(build)

            res.setHeader("Content-Type", "application/pdf")
            res.setHeader("Content-Disposition", "attachment; filename=buildingInfo.pdf")

            pdfDoc.pipe(res)
            pdfDoc.end()
            return
        }

        res.status(200).json({
            success: true,
            mensage: "PDF Generete successfull"
        })

    } catch (error) {
        next(error)
    }
}

const getPdfBuildings = async (req: Request, res: Response, next: NextFunction) => {
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

        //// GENERETE PDF FROM SYSTEM BUILDING LIST
        if (req.query.pdf === "true") {
            const pdfDoc = createBuildingPDF(buildings);

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=buildingInfo.pdf");

            pdfDoc.pipe(res);
            pdfDoc.end();
            return;
        }
        
    } catch (error) {
        next(error);
    }
}

/////////////////////   EXPORTING ALL THE METHODS
export {
    generetePdfByFilterBuildInSystem, getPdfBuildings
};