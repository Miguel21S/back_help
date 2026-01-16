import { NextFunction, Request, Response } from "express";
import { badRequestError, conflictError } from "../../../core/utils/errorStatusCodes";
import { ensureUnique, foundEntity, parserIsActive } from "../../reusableComponents/validatedFunctions";
import { Users } from "../../models/users_models/Users.model";
import { Faculty } from "../../models/admin_institutions_models/Faculty.model";
import { Departments_academics } from "../../models/admin_institutions_models/Departments_academics.model";
import { Employees } from "../../models/admin_institutions_models/Employees.models";
import { Not } from "typeorm";

const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category, user_id, faculty_id, dpto_academic_id } = req.body
        const us_id = Number(user_id);
        const facul_id = Number(faculty_id);
        const dpto_acad_id = Number(dpto_academic_id);

        if (isNaN(us_id)) { throw new badRequestError("Invalid user id") }
        if (isNaN(facul_id)) { throw new badRequestError("Invalid faculty id") }
        if (isNaN(dpto_acad_id)) { throw new badRequestError("Invalid Dpto academic id") }

        await foundEntity<Users>(Users, { id: us_id }, "User not found")
        await foundEntity<Users>(Faculty, { id: facul_id }, "faculty not found")
        await foundEntity<Users>(Departments_academics, { id: dpto_acad_id }, "Dpto academic not found")

        await ensureUnique(
            Employees,
            {
                category,
                user_id: us_id,
                faculty_id: facul_id,
                dpto_academic_id: dpto_acad_id,
            },
            "The Employee already exists"
        )

        await Employees.save({
            category,
            user_id: us_id,
            faculty_id: facul_id,
            dpto_academic_id: dpto_acad_id,
        })

        res.status(201).json({
            success: true,
            message: 'Employees create successfully'
        })

    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            return next(new conflictError("The employee with the same user, faculty, dpto academic, category, already exists."))
        }
        next(error)
    }
}

const getEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const listEmployees = await Employees.find({
            where: { isActive: true },
            relations: ['user', 'faculty', 'departments_academics'],
            select: {
                category: true,
                isActive: true,
                created_date: true,
                user: {
                    name: true
                },
                faculty: {
                    name: true
                },
                departments_academics: {
                    name: true
                }
            }
        })

        res.status(200).json({
            success: true,
            message: 'List employees successfully',
            data: listEmployees
        })
    } catch (error) {
        next(error)
    }
}

const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category, isActive, user_id, faculty_id, dpto_academic_id } = req.body
        const employee_id = Number(req.params.id)

        let id_user = user_id
        let id_facu = faculty_id
        let id_dpto_acad = dpto_academic_id

        if (isNaN(employee_id)) { throw new badRequestError('Invalid employee id') }
        const employee = await foundEntity<Employees>(Employees, { id: employee_id }, "Employed not found")

        if (user_id !== undefined) {
            const us_id = Number(user_id);
            if (isNaN(us_id)) { throw new badRequestError("Invalid user id") }
            await foundEntity<Users>(Users, { id: us_id }, "User not found")

            id_user = us_id
        }

        if (faculty_id !== undefined) {
            const facul_id = Number(faculty_id);
            if (isNaN(facul_id)) { throw new badRequestError("Invalid faculty id") }
            await foundEntity<Faculty>(Faculty, { id: facul_id }, "faculty not found")
            id_facu = facul_id
        }

        if (dpto_academic_id !== undefined) {
            const dpto_acad_id = Number(dpto_academic_id);
            if (isNaN(dpto_acad_id)) { throw new badRequestError("Invalid Dpto academic id") }
            await foundEntity<Departments_academics>(Departments_academics, { id: dpto_acad_id }, "Dpto academic not found")
            id_dpto_acad = dpto_acad_id
        }

        await ensureUnique(
            Employees,
            {
                category: category ?? employee?.category,
                user_id: id_user ?? employee.user_id,
                faculty_id: id_facu ?? employee.faculty_id,
                dpto_academic_id: id_dpto_acad ?? employee.dpto_academic_id,
                id: Not(employee_id)
            },
            "The Employee already exists"
        )

        let active: boolean | undefined;
        if (isActive !== undefined) {
            if (typeof (isActive) !== 'string') {
                throw new badRequestError("isActive must be a 'Activi' or 'Inactive'");
            }
            active = parserIsActive(isActive)
        }

        await Employees.update(
            { id: employee_id },
            {
                category: category ?? employee?.category,
                isActive: active ?? employee?.isActive,
                user_id: id_user ?? employee?.user_id,
                faculty_id: id_facu ?? employee?.faculty_id,
                dpto_academic_id: id_dpto_acad ?? employee?.dpto_academic_id,
            })

        res.status(200).json({
            success: true,
            message: 'Update employee successfully',
        })

    } catch (error) {
        next(error)
    }
}

const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const employee_id = Number(req.params.id)

        if (isNaN(employee_id)) { throw new badRequestError('Invalid employee id') }
        const employee = await foundEntity<Employees>(Employees, { id: employee_id }, "Employed not found")

        if (!employee?.isActive) {
            throw new badRequestError("Employee already deleted")
        }

        await Employees.update(
            { id: employee_id },
            {
                isActive: false,
                deletedAt: new Date()
            }
        )

        res.status(200).json({
            success: true,
            message: 'Delete employee successfully'
        })
    } catch (error) {
        next(error)
    }
}