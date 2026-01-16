import { NextFunction, Request, Response } from "express";
import { badRequestError, conflictError, notFoundError } from "../../../core/utils/errorStatusCodes";
import { ensureUnique, foundEntity, parserIsActive } from "../../reusableComponents/validatedFunctions";
import { Users } from "../../models/users_models/Users.model";
import { Departments_academics } from "../../models/admin_institutions_models/Departments_academics.model";
import { Teachers } from "../../models/admin_institutions_models/Teachers.model";
import { Not } from "typeorm";


///////////////////////   METHOD CREATE TEACHER
const createTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category, specialty, user_id, dpto_academic_id } = req.body
        const id_user = Number(user_id)
        const dpto_id = Number(dpto_academic_id)

        if (isNaN(id_user)) { throw new badRequestError('Invalid user id') }
        if (isNaN(dpto_id)) { throw new badRequestError('Invalid department id') }

        await foundEntity<Users>(Users, { id: id_user }, 'User not found')
        await foundEntity<Departments_academics>(Departments_academics, { id: dpto_id }, 'Department not found')

        await ensureUnique(
            Teachers,
            {
                user_id: id_user
            },
            "The user already exist on the teachers list"
        )

        await Teachers.save({
            category,
            specialty,
            user_id: id_user,
            dpto_academic_id: dpto_id
        })

        res.status(201).json({
            success: true,
            message: 'Teacher create successfully'
        })

    } catch (error: any) {
        if(error.code === "ER_DUP_ENTRY") {
            return next(new conflictError("A teacher with the same id user, already exists."))
        }
        next(error)
    }
}

///////////////////////   METHOD RETURNING LIST OF TEACHERS
const getTeachers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listTeachers = await Teachers.find({
            relations: ['user', 'departments_academics', 'departments_academics.faculty'],
            select: {
                category: true,
                specialty: true,
                user: {
                    name: true,
                    lastName: true,
                    email: true
                },
                departments_academics: {
                    name: true,
                    faculty: {
                        name: true
                    },
                },
            }
        })

        res.status(200).json({
            success: true,
            message: 'List of teachers successfully found',
            data: listTeachers
        })

    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD UPDATE TEACHER BY ID
const updateTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category, specialty, isActive, user_id, dpto_academic_id } = req.body
        const teacher_id = Number(req.params.id)

        if (isNaN(teacher_id)) { throw new badRequestError("teacher id Invalid") }

        const teacher = await foundEntity<Teachers>(Teachers, { id: teacher_id }, "Teacher not found")
        let us_id = teacher.user_id
        let dptoAcd_id = teacher.dpto_academic_id
        let active: boolean | undefined;

        if (isActive !== undefined && typeof (isActive) === 'string') {
            active = parserIsActive(isActive)
        }

        if (user_id !== undefined) {
            const id_user = Number(user_id)
            if (isNaN(id_user)) { throw new badRequestError("User id Invalid") }

            const user = await foundEntity<Users>(Users, { id: id_user }, "User not found")
            us_id = user?.id
        }

        if (dpto_academic_id !== undefined) {
            const id_dptoAcadmic = Number(dpto_academic_id)
            if (isNaN(id_dptoAcadmic)) { throw new badRequestError("Department academic id invalid") }

            const acadmic_dpto = await foundEntity<Departments_academics>(Departments_academics, { id: id_dptoAcadmic }, "Departments not found")
            dptoAcd_id = acadmic_dpto?.id
        }

        await ensureUnique(
            Teachers,
            {
                user_id: us_id,
                id: Not(teacher_id)
            },
            "The user already exist on the teachers list"
        )

        await Teachers.update(
            { id: teacher_id },
            {
                category: category ?? teacher?.category,
                specialty: specialty ?? teacher?.specialty,
                isActive: active ?? teacher?.isActive,
                user_id: us_id ?? teacher?.user_id,
                dpto_academic_id: dptoAcd_id ?? teacher?.dpto_academic_id,
            })

        res.status(200).json({
            success: true,
            message: "Teacher update successfully"
        })
    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD DELETE TEACHER BY ID
const deleteTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teacher_id = Number(req.params.id)

        if (isNaN(teacher_id)) { throw new badRequestError("Invalid teacher id") }

        const teacher = await foundEntity<Teachers>(Teachers, { id: teacher_id }, "Teacher not found ")

        if (!teacher.isActive) {
            throw new badRequestError("Teacher already deleted")
        }

        await Teachers.update(
            { id: teacher_id },
            {
                isActive: false,
                deletedAt: new Date()
            }
        )

        res.status(204).json({
            success: true,
            message: "Teacher deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}

export {
    createTeacher, getTeachers, updateTeacher, deleteTeacher
}