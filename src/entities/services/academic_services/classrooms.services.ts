import { NextFunction, Request, Response } from "express";
import { ensureUnique, foundEntity, parseId, parserIsActive } from "../../reusableComponents/validatedFunctions";
import { Classrooms } from "../../models/academic_models/Classrooms.models";
import { badRequestError, conflictError } from "../../../core/utils/errorStatusCodes";
import { Not } from "typeorm";


///////////////////////   METHOD CREATE CLASSROOM
const createClassroom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, capacity, location, type } = req.body

        const normalizedState = type.toUpperCase();
        const validStates = ['THEORETICAL', 'PRACTICAL', 'AUDIT'];

        await ensureUnique(
            Classrooms,
            {
                name: name,
                location: location,
            },
            'The Classroom already exists'
        )

        if (!validStates.includes(normalizedState)) {
            throw new badRequestError("Invalid status  must be TYPE', 'THEORETICAL', 'PRACTICAL', or 'AUDIT'")
        }

        await Classrooms.save({
            name,
            capacity,
            location,
            type: normalizedState
        })

        res.status(201).json({
            success: true,
            message: 'Classrooms create successfully'
        })

    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            return next(new conflictError("The classrooms with the same, name, location, already exists."))
        }
        next(error)
    }
}

///////////////////////   METHOD METHOD RETURNING LIST OF CLASSROOMS
const getClassrooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listClassrooms = await Classrooms.find({
            select: {
                name: true,
                capacity: true,
                location: true,
                type: true,
                isActive: true
            }
        })

        res.status(200).json({
            success: true,
            message: 'List of the classrooms successfully',
            data: listClassrooms
        })
    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD UPDATE CLASSROOM BY ID
const updateClassroom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, capacity, location, type, isActive } = req.body

        const classroom_id = parseId(req.params.id, 'classroom')
        const classroom = await foundEntity<Classrooms>(Classrooms, { id: classroom_id }, 'Classroom not found')

        let ative: boolean | undefined

        if(isActive !== undefined && typeof(isActive) === 'string'){
            ative = parserIsActive(isActive)
        }

        await ensureUnique(
            Classrooms,
            {
                name: name ?? classroom?.name,
                location : location ?? classroom?.location,
                id: Not(classroom_id)
            },
            'The Classroom already exists'
        )

        await Classrooms.update(
            { id: classroom_id },
            {
                name: name ?? classroom?.name,
                capacity: capacity ?? classroom?.capacity,
                location : location ?? classroom?.location,
                type : type ?? classroom?.type,
                isActive : ative ?? classroom?.isActive,
            }
        )

        res.status(200).json({
            success: true,
            message: 'Classrooms update successfully'
        })

    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD DELETE CLASSROOM BY ID
const deleteClassroom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classroom_id = parseId(req.params.id, 'classroom')
        const classroom = await foundEntity<Classrooms>(Classrooms, { id: classroom_id }, 'Classroom not found')

        if(!classroom?.isActive){
            throw new badRequestError("Employee already deleted")
        }

        await Classrooms.update(
            {id: classroom_id },
            {
                isActive: false,
                deletedAt: new Date()
            }
        )

        res.status(200).json({
            success: true,
            message: 'Classroom delete successfully'
        })
    } catch (error) {
        next(error)
    }
}

export{
    createClassroom, getClassrooms, updateClassroom, deleteClassroom
}