import { NextFunction, Request, Response } from "express";
import { Faculty } from "../../models/admin_models_institution/Faculty.model";
import { authorizationError, badRequestError, conflictError, notFoundError } from "../../../core/utils/errorStatusCodes";
import { Users } from "../../models/roles_users_permission/Users.model";
import { Institution } from "../../models/admin_models_institution/Institutions.model";
import { Not } from "typeorm";
import { ensureUnique, parserIsActive, validEmail } from "../../reusableComponents/validatedFunctions";

///////////////////////   METHOD CREATE FACULTY
const createFaculty = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, phone, email_faculty, email_user, institution_id } = req.body

        if (!name || !email_faculty || !email_user || !institution_id) {
            throw new badRequestError("Missing required fields")
        }

        const normalizedEmail_faculty = validEmail(email_faculty, "Email of faculty is invaled")
        const normalizedEmail_user = validEmail(email_user, "Email user is invaled")


        const institutions = await Institution.findOne({ where: { id: institution_id } })
        if (!institutions) { throw new notFoundError('Institution not found') }

        await ensureUnique(
            Faculty,
            { name, institution_id },
            "The faculty already exists in the database"
        )

        await ensureUnique(
            Faculty,
            { email: normalizedEmail_faculty },
            "The email already exists in the faculty"
        )

        const user = await Users.findOne({ where: { email: normalizedEmail_user } })
        if (!user) { throw new notFoundError("User not found") }
        if (!user?.isActive) { throw new authorizationError("User not active") }

        const faculty = await Faculty.save({
            name,
            description,
            dean: `${user?.name} ${user?.lastName}`,
            phone,
            email: normalizedEmail_faculty,
            institution_id: institutions?.id,

        })

        res.status(201).json({
            success: true,
            message: "Faculty create successfully",
            data: faculty
        })
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            return next(new conflictError("A faculty with the same name, institution id, or email, already exists."))
        }
        next(error)
    }
}

///////////////////////   METHOD RETURNING LIST OF FACULTIES
const getListFaculties = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listFaculties = await Faculty.find({
            select: {
                id: true,
                name: true,
                description: true,
                dean: true,
                phone: true,
                email: true,
                isActive: true,
                institution_id: true,
            }
        })

        res.status(200).json({
            success: true,
            message: "List of faculty successfully",
            data: listFaculties
        })
    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD UPDATE FACULTY BY ID
const updateFacultyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const faculty_id = Number(req.params.id)
        const { name, description, dean, phone, email, institution_id, isActive } = req.body

        if (isNaN(faculty_id)) { throw new badRequestError("Invalid faculty id") }

        const foundFaculty = await Faculty.findOne({ where: { id: faculty_id } })
        if (!foundFaculty) { throw new notFoundError("Faculty not found") }

        if (institution_id) {
            const institution = await Institution.findOne({ where: { id: institution_id } })
            if (!institution) throw new notFoundError("Institution not found")
        }

        const normalizedEmail = email !== undefined
            ? validEmail(email, "Invalid email")
            : foundFaculty.email

        await ensureUnique(
            Faculty,
            {
                email: normalizedEmail ?? foundFaculty?.email,
                id: Not(faculty_id)
            },
            "The email already exists in the faculty"
        )

        await ensureUnique(
            Faculty,
            {
                name: name ?? foundFaculty?.name,
                institution_id: institution_id ?? foundFaculty?.institution_id,
                id: Not(faculty_id),
            },
            "The faculty already exists in the database"
        )

        let active: boolean | undefined;
        if (isActive !== undefined) {
            active = parserIsActive(isActive)
        }

        await Faculty.update(
            { id: faculty_id },
            {
                name: name ?? foundFaculty?.name,
                description: description ?? foundFaculty?.description,
                dean: dean ?? foundFaculty?.dean,
                phone: phone ?? foundFaculty?.phone,
                isActive: active ?? foundFaculty?.isActive,
                email: normalizedEmail ?? foundFaculty?.email,
                institution_id: institution_id ?? foundFaculty?.institution_id
            }
        )

        res.status(200).json({
            success: true,
            message: "Faculty update successfully",
        })
    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD DELETE FACULTY BY ID
const deletedFacultyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const faculty_id = Number(req.params.id)

        if (isNaN(faculty_id)) { throw new badRequestError("Invalid id faculty") }

        const faculty = await Faculty.findOne({ where: { id: faculty_id } })
        if (!faculty) { throw new notFoundError("Faculty not found") }

        await Faculty.remove(faculty)

        res.status(204).json({
            success: true,
            message: "Faculty remove successfully"
        })
    } catch (error) {
        next(error)
    }
}

const dashboardFaculties = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const totalFalculty = await Faculty.find();
        if (totalFalculty.length === 0) {
            res.status(201).json({
                seccess: true,
                message: "List of faculties is empty"
            })
        }

        // const

        res.status(201).json({
            seccess: true,
            message: "List of faculties",
            data: {
                totalFalculty
            }
        })
    } catch (error) {
        next(error)
    }
}

export {
    createFaculty, getListFaculties, updateFacultyById, deletedFacultyById
}