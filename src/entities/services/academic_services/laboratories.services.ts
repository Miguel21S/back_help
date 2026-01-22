import { Request, Response, NextFunction } from "express";
import { badRequestError, conflictError } from "../../../core/utils/errorStatusCodes";
import { ensureUnique, foundEntity, parseId, parserIsActive } from "../../reusableComponents/validatedFunctions";
import { Laboratories } from "../../models/academic_models/Laboratories.models";
import { Not } from "typeorm";

///////////////////////   METHOD CREATE LABORATORY
const createLaboratory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, capacity, location, equipment } = req.body
        const requiredFields = { name, capacity, location, equipment }

        let cap: number | undefined;

        for (const [field, value] of Object.entries(requiredFields)) {
            if (value === undefined || value === null || value.toString().trim() === '') {
                throw new badRequestError(`The ${field} field is mandatory and cannot be empty.`);
            }
        }

        if (capacity !== undefined) {
            cap = Number(capacity);
            if (Number.isNaN(cap) || cap <= 0) {
                throw new badRequestError("Capacity must be greater than 0");
            }
        }

        await ensureUnique(
            Laboratories,
            {
                name, location
            },
            'The laboratory with name, location already exists'
        )

        await Laboratories.save({
            name,
            capacity: cap,
            location,
            equipment,
        })

        res.status(201).json({
            success: true,
            message: 'Laboratory created successfully'
        })
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            return next(new conflictError("The laboratory with the, name, location already exists."))
        }
        next(error)
    }
}

///////////////////////   METHOD RETURNING LIST OF LABORATORIES
const getLaboratory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listLaboratories = await Laboratories.find({
            select: {
                name: true,
                capacity: true,
                location: true,
                equipment: true,
                isActive: true,
            }
        })

        res.status(200).json({
            success: true,
            message: 'Laboratories retrieved successfully',
            data: listLaboratories
        })

    } catch (error) {
        next(error)
    }
}

// ///////////////////////   METHOD UPDATE LABORATORY BY ID
const updateLaboratory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, capacity, location, equipment, isActive } = req.body

        let cap: number | undefined;

        const lab_id = parseId(req.params.id, 'laboratory')
        let active: boolean | undefined

        const foundLabs = await foundEntity<Laboratories>(Laboratories, { id: lab_id }, 'Laboratory not found')

        if (isActive !== undefined && typeof (isActive) === 'string') {
            active = parserIsActive(isActive)
        }

        if (capacity !== undefined) {
            cap = Number(capacity);
            if (Number.isNaN(cap) || cap <= 0) {
                throw new badRequestError("Capacity must be greater than 0");
            }
        }

        await ensureUnique(
            Laboratories,
            {
                name: name ?? foundLabs?.name,
                location: location ?? foundLabs?.location,
                id: Not(lab_id)
            },
            'The laboratory with name, location already exists'
        )

        await Laboratories.update(
            { id: lab_id },
            {
                name: name ?? foundLabs?.name,
                capacity: cap !== undefined ? cap : foundLabs?.capacity,
                location: location ?? foundLabs?.location,
                equipment: equipment ?? foundLabs?.equipment,
                isActive: active ?? foundLabs?.isActive,
            }
        )

        res.status(200).json({
            success: true,
            message: 'Laboratories updated successfully'
        })

    } catch (error) {
        next(error)
    }
}

// ///////////////////////   METHOD DELETE LABORATORY BY ID
// const deleteLaboratory = async (req: Request, res: Response, next: NextFunction) => {

export {
    createLaboratory, getLaboratory, updateLaboratory
}

// sonia 