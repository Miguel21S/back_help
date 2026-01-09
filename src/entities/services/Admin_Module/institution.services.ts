import { NextFunction, Request, Response } from "express";
import { Institution } from "../../models/Institutions.model";
import { badRequestError, conflictError, notFoundError } from "../../../core/utils/errorStatusCodes";
import { Not } from "typeorm";
import { ensureUnique, validEmail } from "../../reusableComponents/validatedFunctions";

///////////////////////   METHOD CREATE INSTITUTION
const createInstitution = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            name, description, type, address, country, province, city,
            postal_code, phone, email, website
        } = req.body;

        // if (!validEmail(normalizedEmail)) { throw new badRequestError("Email invaled") }
        const normalizedEmail = validEmail(email, "Envalid email")

        await ensureUnique(
            Institution,
            {
                name, address, country, province, city,
                postal_code, email: normalizedEmail
            },
            "The institution already exists in the database"
        )

        await Institution.save({
            name,
            description,
            type,
            address,
            country,
            province,
            city,
            postal_code,
            phone,
            email: normalizedEmail,
            website,
        })

        res.status(201).json({
            success: true,
            message: 'Institution created with successfully',
        })

    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD RETURNING LIST OF INSTITUTIONS
const getInstitution = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listInstitution = await Institution.find({
            select: {
                name: true,
                description: true,
                type: true,
                address: true,
                country: true,
                province: true,
                city: true,
                postal_code: true,
                phone: true,
                email: true,
                isActive: true,
                website: true
            }
        })

        res.status(200).json({
            success: true,
            message: "List of institutions successfully found",
            data: listInstitution
        })
    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD UPDATE INSTITUTION
const updateInstitution = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const institution_id = Number(req.params.id)
        const {
            name, description, type, address, country, province, city,
            postal_code, phone, email, website
        } = req.body;

        if (isNaN(institution_id)) { throw new badRequestError("Invalid institution id") }

        const foundInstitution = await Institution.findOne({ where: { id: institution_id } })
        if (!foundInstitution) { throw new notFoundError('Institution not found') }

        const normalizedEmail = email !== undefined 
        ? validEmail(email, "Email invalid") 
        : foundInstitution?.email

        await ensureUnique(
            Institution,
            {
                name: name ?? foundInstitution?.name,
                country: country ?? foundInstitution?.country,
                city: city ?? foundInstitution?.city,
                email: normalizedEmail ?? foundInstitution?.email,
                id: Not(institution_id),
            },
            "The institution already exists in the database"
        )


        await Institution.update(
            institution_id,
            {
                name: name ?? foundInstitution.name,
                description: description ?? foundInstitution.description,
                type: type ?? foundInstitution.type,
                address: address ?? foundInstitution.address,
                country: country ?? foundInstitution.country,
                province: province ?? foundInstitution.province,
                city: city ?? foundInstitution.city,
                postal_code: postal_code ?? foundInstitution.postal_code,
                phone: phone ?? foundInstitution.phone,
                email: normalizedEmail ?? foundInstitution.email,
                website: website ?? foundInstitution.website
            }
        )

        res.status(200).json({
            success: true,
            message: "Institution update successfully"
        })

    } catch (error) {
        next(error)
    }
}

export {
    createInstitution, getInstitution, updateInstitution
}