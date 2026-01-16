import { NextFunction, Request, Response } from "express";
import { Faculty } from "../../models/admin_institutions_models/Faculty.model";
import { badRequestError, conflictError, notFoundError } from "../../../core/utils/errorStatusCodes";
import { Departments_academics } from "../../models/admin_institutions_models/Departments_academics.model";
import { ensureUnique, foundEntity, parserIsActive, validEmail } from "../../reusableComponents/validatedFunctions";
import { Not } from "typeorm";
import { Users } from "../../models/users_models/Users.model";

///////////////////////   METHOD CREATE DEPARTMENT
const createDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            name, description, email_head_department, email_department, faculty_id
        } = req.body
        const fac_id = Number(faculty_id)

        const normalizedEmail = validEmail(email_department, "Envalid email department")
        const normalizedEmailHead = validEmail(email_head_department, "Envalid email department head")


        if (isNaN(fac_id)) { throw new badRequestError("Faculty id is invalid") }

        const foundFaculty = await Faculty.findOne({ where: { id: fac_id } })
        if (!foundFaculty) { throw new notFoundError("Faculty not found") }

        await ensureUnique(
            Departments_academics,
            {
                email: normalizedEmail
            },
            "Email already exists in department"
        )

        await ensureUnique(
            Departments_academics,
            {
                name, faculty_id: fac_id
            },
            "The Department already exists in faculty"
        )

        const user = await Users.findOne({ where: { email: normalizedEmailHead } })
        if (!user) { throw new notFoundError("User not found") }

        await Departments_academics.save({
            name,
            description,
            department_head: `${user?.name} ${user?.lastName}`,
            email: normalizedEmail,
            faculty_id: fac_id,
            institution_id: foundFaculty.institution_id
        })

        res.status(201).json({
            success: true,
            message: "Department create successfully"
        })
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            return next(new conflictError("A department with the same name, or email, already exists."))
        }
        next(error)
    }
}

///////////////////////   METHOD RETURNING LIST OF DEPARTMENTS
const getListDepartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listDepartments = await Departments_academics.find({
            relations: ["faculty", "institution"],
            select: {
                id: true,
                name: true,
                description: true,
                department_head: true,
                email: true,
                isActive: true,
                faculty: {
                    name: true
                },
                institution: {
                    name: true
                }
            }
        })

        res.status(200).json({
            success: true,
            message: "List os departments successfully",
            data: listDepartments
        })

    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD UPDATE DEPARTMENT BY ID
const updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dept_id = Number(req.params.id)
        const { name, description, department_head, email, isActive, faculty_id } = req.body

        if (isNaN(dept_id)) { throw new badRequestError("Department id invalid") }

        const foundDepartment = await Departments_academics.findOne({ where: { id: dept_id } })
        if (!foundDepartment) { throw new notFoundError("Department not found") }

        let facultyId = foundDepartment.faculty_id
        let institutionId = foundDepartment.institution_id

        if (faculty_id !== undefined) {
            const fac_id = Number(faculty_id)
            if (isNaN(fac_id)) {
                throw new badRequestError("Faculty id invalid")
            }

            const foundFaculty = await foundEntity<Faculty>(Faculty, { id: fac_id }, "Faculty not found")

            facultyId = fac_id
            institutionId = foundFaculty.institution_id
        }

        const normalizedEmail = email !== undefined
            ? validEmail(email, "Email invalid")
            : foundDepartment?.email

        await ensureUnique(
            Departments_academics,
            {
                email: normalizedEmail ?? foundDepartment?.email,
                id: Not(dept_id)
            },
            "Email already exists in department"
        )

        await ensureUnique(
            Departments_academics,
            {
                name: name ?? foundDepartment?.name,
                faculty_id: facultyId ?? foundDepartment.faculty_id,
                id: Not(dept_id)
            },
            "The Department already exists in faculty"
        )

        let active: boolean | undefined;
        if (isActive !== undefined && typeof(isActive) === 'string') {
            active = parserIsActive(isActive)
        }

        const upDpto = await Departments_academics.update(
            dept_id,
            {
                name: name ?? foundDepartment?.name,
                description: description ?? foundDepartment?.description,
                department_head: department_head ?? foundDepartment?.department_head,
                email: normalizedEmail ?? foundDepartment?.email,
                isActive: active ?? foundDepartment?.isActive,
                faculty_id: facultyId,
                institution_id: institutionId
            }
        )

        res.status(200).json({
            success: true,
            message: "Department update successfully",
        })

    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD DELETE DEPARTMENT BY ID
const deleteDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dept_id = Number(req.params.id)

        if (isNaN(dept_id)) { throw new badRequestError("Invalid department id") }

        const foundDepartment = await Departments_academics.findOne({ where: { id: dept_id } })
        if (!foundDepartment) { throw new notFoundError("Department not found") }

        await Departments_academics.remove(foundDepartment)

        res.status(200).json({
            success: true,
            message: 'Delete department successfully'
        })
    } catch (error) {
        next(error)
    }
}

export {
    createDepartment, getListDepartments, updateDepartment,
    deleteDepartmentById
}