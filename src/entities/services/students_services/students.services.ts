import { NextFunction, Request, Response } from "express"
import { badRequestError, conflictError, notFoundError } from "../../../core/utils/errorStatusCodes"
import { ensureUnique, foundEntity, parseId, parserIsActive } from "../../reusableComponents/validatedFunctions";
import { Users } from "../../models/users_models/Users.model";
import { Programs } from "../../models/admin_institutions_models/Programs.model";
import { Students } from "../../models/students_models/students.models";
import { Not } from "typeorm";

///////////////////////   METHOD CREATE STUDENT
const createStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { state, user_id, program_id } = req.body

        const normalizedState = state.toUpperCase();
        const validStates = ['ACTIVE', 'GRADUATED', 'SUPENDED'];

        const us_id = parseId(user_id, 'user')
        const prog_id = parseId(program_id, 'program')

        await foundEntity<Users>(Users, { id: us_id }, 'User not found')
        await foundEntity<Programs>(Programs, { id: prog_id }, 'Program not found')

        await ensureUnique(
            Students,
            {
                user_id: us_id,
            },
            'The Student already exists'
        )

        if (!validStates.includes(normalizedState)) {
            throw new badRequestError("Invalid status  must be, 'ACTIVE', 'GRADUATED', or 'SUPENDED'")
        }

        await Students.save({
            state: normalizedState,
            user_id: us_id,
            program_id: prog_id
        })

        res.status(201).json({
            success: true,
            message: 'Student create successfully'
        })

    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            return next(new conflictError("The student with the same user, already exists."))
        }
        next(error)
    }
}

///////////////////////   METHOD RETURNING LIST OF STUDENTS
const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listProgram = await Students.find({
            where: { isActive: true },
            relations: ['user', 'programs'],
            select: {
                date_admission: true,
                state: true,
                isActive: true,
                user: {
                    name: true,
                    lastName: true,
                    email: true
                },
                programs: {
                    name: true,
                    degree: true,
                    duration: true,
                    total_credits: true,
                    modality: true,
                }
            }
        })

        res.status(200).json({
            success: true,
            message: 'list of program successfully',
            data: listProgram
        })
    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD UPDATE STUDENT BY ID
const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { state, isActive, user_id, program_id } = req.body
        const idStudent = parseId(req.params.id, 'student');

        let userId = user_id;
        let progId = program_id;
        let states = state;

        const validStates = ['ACTIVE', 'GRADUATED', 'SUPENDED'];
        let ative: boolean | undefined

        const student = await foundEntity<Students>(Students, { id: idStudent }, 'Program not found')

        if (isActive !== undefined && typeof (isActive) === 'string') {
            ative = parserIsActive(isActive)
        }

        if (user_id !== undefined) {
            let us_id = parseId(user_id, 'user')
            await foundEntity<Users>(Users, { id: us_id }, 'User not found')
            userId = us_id;
        }

        if (program_id !== undefined) {
            let prog_id = parseId(program_id, 'program')
            await foundEntity<Programs>(Programs, { id: prog_id }, 'Program not found')
            progId = prog_id
        }

        await ensureUnique(
            Students,
            {
                user_id: userId ?? student?.user_id,
                id: Not(idStudent)
            },
            'The Student already exists'
        )

        if (state !== undefined) {
            if (typeof state !== 'string') {
                throw new badRequestError("State must be a string");
            }

            const normalizedState = state.toUpperCase();
            if (!validStates.includes(normalizedState)) {
                throw new badRequestError("Invalid status  must be ACTIVE', 'GRADUATED', or 'SUPENDED'")
            }
            states = normalizedState
        }

        await Students.update(
            { id: idStudent },
            {
                state: states ?? student?.state,
                isActive: ative ?? student?.isActive,
                user_id: userId ?? student?.user_id,
                program_id: progId ?? student?.program_id,
            }
        )

        res.status(200).json({
            success: true,
            message: 'Update student successfully'
        })
    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD DELETE STUDENT BY ID
const deleteStudent = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const student_id = parseId(req.params.id, 'student')
        const student = await foundEntity<Students>(Students, { id: student_id }, 'Student not found')

        if(!student?.isActive){
            throw new badRequestError("Employee already deleted")
        }

        await Students.update(
            { id: student_id },
            {
                isActive: false,
                deletedAt: new Date()
            }
        )

        res.status(200).json({
            success: true,
            message: 'Student deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}

export{
    createStudents, getStudents, updateStudent, deleteStudent
}