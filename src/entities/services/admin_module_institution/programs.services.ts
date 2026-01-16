import { NextFunction, Request, Response } from "express";
import { badRequestError, conflictError, notFoundError } from "../../../core/utils/errorStatusCodes";
import { ensureUnique, foundEntity } from "../../reusableComponents/validatedFunctions";
import { Faculty } from "../../models/admin_institutions_models/Faculty.model";
import { Program, ProgramState } from "../../models/admin_institutions_models/Programs.model";
import { Not } from "typeorm";

///////////////////////   METHOD CREATE PROGRAM
const createPrograms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            name, degree, duration, total_credits, modality, coordinator, faculty_id
        } = req.body
        const facult_id = Number(faculty_id)

        if (isNaN(facult_id)) { throw new badRequestError("Invalid faculty id") }

        await foundEntity<Faculty>(Faculty, { id: facult_id }, "Facult not found")

        await ensureUnique(
            Program,
            {
                name,
                degree,
                faculty_id: facult_id
            },
            "The program already exist on faculty"
        )

        await Program.save({
            name,
            degree,
            duration,
            total_credits,
            modality,
            coordinator,
            faculty_id: facult_id
        })

        res.status(201).json({
            success: true,
            message: "Program create successfully"
        })

    } catch (error: any) {
        // console.error("error:", error)
        if (error.code === "ER_DUP_ENTRY") {
            return next(new conflictError("A institution with the same name, degree, and faculty id, already exists."))
        }
        next(error)
    }
}

///////////////////////   METHOD RETURNING LIST OF PROGRAMS
const getPrograms = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const listPrograms = await Program.find({
            relations: ['faculty'],
            select: {
                name: true,
                degree: true,
                duration: true,
                total_credits: true,
                modality: true,
                coordinator: true,
                state: true,
                faculty: {
                    name: true
                }
            }
        })


        res.status(201).json({
            success: true,
            message: "List the program successfully",
            data: listPrograms
        })

    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD UPDATE PROGRAM BY ID
const updateProgram = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            name, degree, duration, total_credits, modality, coordinator, state, faculty_id
        } = req.body
        const prgram_id = Number(req.params.id)
        const validStates = ['ACTIVE', 'INACTIVE', 'GRADUATED', 'SUPENDED'];

        if (isNaN(prgram_id)) { throw new badRequestError("Invalid program id") }

        const program = await foundEntity<Program>(Program, { id: prgram_id }, "Program id not found")
        let facult_id = program?.faculty_id

        if (faculty_id !== undefined) {
            const fac_id = Number(faculty_id)
            if (isNaN(fac_id)) { throw new badRequestError("Invalid faculty id") }

            await foundEntity<Faculty>(Faculty, { id: fac_id }, "Faculty not found")

            facult_id = fac_id
        }

        await ensureUnique(
            Program,
            {
                name: name ?? program?.name,
                degree: degree ?? program?.degree,
                faculty_id: facult_id ?? program?.faculty,
                id: Not(prgram_id)
            },
            "The program already exist on program"
        )

        let states = state

        if (state !== undefined) {
            if (typeof state !== 'string') {
                throw new badRequestError("State must be a string");
            }

            const normalizedState = state.toUpperCase();

            if (!validStates.includes(normalizedState)) {
                throw new badRequestError("Invalid status  must be ACTIVE', 'INACTIVE', 'GRADUATED', or 'SUPENDED'")
            }
            states = normalizedState
        }

        await Program.update(
            { id: prgram_id },
            {
                name: name ?? program?.name,
                degree: degree ?? program?.degree,
                duration: duration ?? program.duration,
                total_credits: total_credits ?? program?.total_credits,
                modality: modality ?? program?.modality,
                coordinator: coordinator ?? program?.coordinator,
                state: states ?? program?.state,
                faculty_id: facult_id ?? program?.faculty,
            }
        )

        res.status(200).json({
            success: true,
            message: "Program update successfully"
        })

    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD DELETE PROGRAM BY ID
const deleteProgram = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prgram_id = Number(req.params.id)

        if (isNaN(prgram_id)) { throw new badRequestError("invalid program id") }

        const program = await foundEntity<Program>(Program, { id: prgram_id }, "Program not found")

        if (program.state === ProgramState.GRADUATED) {
            throw new badRequestError("Graduated programs cannot be deleted")
        }

        if (program.state === ProgramState.INACTIVE) {
            throw new badRequestError("Program is already inactive")
        }

        await Program.update(
            { id: prgram_id },
            { state: ProgramState.INACTIVE }
        )

        res.status(200).json({
            success: true,
            message: "Program deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}

export {
    createPrograms, getPrograms, updateProgram, deleteProgram
}