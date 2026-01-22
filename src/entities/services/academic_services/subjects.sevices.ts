import { Request, Response, NextFunction } from "express";
import { badRequestError, conflictError } from "../../../core/utils/errorStatusCodes";
import { ensureUnique, foundEntity, parseId, parserIsActive } from "../../reusableComponents/validatedFunctions";
import { Faculty } from "../../models/admin_institutions_models/Faculty.model";
import { Departments_academics } from "../../models/admin_institutions_models/Departments_academics.model";
import { Subject } from "typeorm/persistence/Subject.js";
import { Subjects } from "../../models/academic_models/subjects.models";
import { Not } from "typeorm";

///////////////////////   METHOD CREATE SUBJECT
const createSubject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, subject_code, total_credits, semester, type, description, faculty_id, dpto_academic_id } = req.body
        const requiredFields = { name, subject_code, total_credits, semester, type, faculty_id, dpto_academic_id };

        const validStates = ['MANDATORY', 'OPTIONAL'];

        for (const [field, value] of Object.entries(requiredFields)) {
            if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
                throw new badRequestError(`The ${field} field is mandatory and cannot be empty.`);
            }
        }

        /*  if (!type) {
             throw new badRequestError("Type is mandatory and must be a string");
         } */

        const normalizedState = type.toUpperCase().trim();

        let facultyId = parseId(faculty_id, 'faculty')
        let dpto_academicId = parseId(dpto_academic_id, 'dpto academic')
        let totalcredits = Number(total_credits);

        if (Number.isNaN(totalcredits) || totalcredits <= 0) {
            throw new badRequestError("Total credits must be greater than 0");
        }

        await foundEntity<Faculty>(Faculty, { id: facultyId }, 'Faculty not found');
        await foundEntity<Departments_academics>(Departments_academics, { id: dpto_academicId }, 'Departments academics not found');

        await ensureUnique(
            Subjects,
            {
                subject_code
            },
            'The Subject with subject code, already exists'
        )

        if (!validStates.includes(normalizedState)) {
            throw new badRequestError("Invalid type. Must be TYPE, 'MANDATORY', 'OPTIONAL'")
        }

        await Subjects.save({
            name,
            subject_code,
            total_credits: totalcredits,
            semester,
            type: normalizedState,
            description,
            faculty_id: facultyId,
            dpto_academic_id: dpto_academicId
        })

        res.status(201).json({
            success: true,
            message: 'Subject created successfully'
        })
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            return next(new conflictError("The subject with the same, subject_code already exists."))
        }
        next(error)
    }
}
///////////////////////   METHOD RETURNING LIST OF SUBJECTS
const getSubject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listSubjects = await Subjects.find({
            relations: ['faculty', 'departments_academics'],
            select: {
                name: true,
                subject_code: true,
                total_credits: true,
                semester: true,
                type: true,
                description: true,
                isActive: true,
                faculty: {
                    name: true,

                },
                departments_academics: {
                    name: true
                }
            }
        })

        res.status(200).json({
            success: true,
            message: 'Subjects retrieved successfully',
            data: listSubjects
        })
    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD UPDATE SUBJECT BY ID
const updateSubject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, subject_code, total_credits, semester, type, description, isActive, faculty_id, dpto_academic_id } = req.body
        const subject_id = parseId(req.params.id, 'subject')

        const foundSubject = await foundEntity<Subjects>(Subjects, { id: subject_id }, 'Subject not found')

        const validStates = ['MANDATORY', 'OPTIONAL'];
        let active: boolean | undefined;
        let updatedType = type;

        if (isActive !== undefined && typeof (isActive) === 'string') {
            active = parserIsActive(isActive)
        }

        let facultyId = faculty_id
        let dpto_academicId = dpto_academic_id
        let totalcredits: number | undefined;

        if (total_credits !== undefined) {
            totalcredits = Number(total_credits);
            if (Number.isNaN(totalcredits) || totalcredits <= 0) {
                throw new badRequestError("Total credits must be greater than 0");
            }
        }

        if (faculty_id !== undefined) {
            const fac_id = parseId(faculty_id, 'faculty')
            await foundEntity<Faculty>(Faculty, { id: fac_id }, 'Faculty not found');
            facultyId = fac_id;
        }

        if (dpto_academic_id !== undefined) {
            const dpto_acad_id = parseId(dpto_academic_id, 'dpto academic')
            await foundEntity<Departments_academics>(Departments_academics, { id: dpto_acad_id }, 'Departments academics not found');
            dpto_academicId = dpto_acad_id
        }

        await ensureUnique(
            Subjects,
            {
                subject_code: subject_code ?? foundSubject?.subject_code,
                id: Not(subject_id)
            },
            'The Subject with subject code, already exists'
        )

        if (type !== undefined) {
            if (typeof (type) !== 'string') {
                throw new badRequestError("Type must be a string");
            }

            const normalizedState = type.toUpperCase().trim();
            if (!validStates.includes(normalizedState)) {
                throw new badRequestError("Invalid type. Must be 'MANDATORY', 'OPTIONAL'")
            }
            updatedType = normalizedState

        }

        await Subjects.update(
            { id: subject_id },
            {
                name: name ?? foundSubject?.name,
                subject_code: subject_code ?? foundSubject?.subject_code,
                total_credits: totalcredits ?? foundSubject?.total_credits,
                semester: semester ?? foundSubject?.semester,
                type: updatedType ?? foundSubject?.type,
                description: description ?? foundSubject?.description,
                isActive: active ?? foundSubject?.isActive,
                faculty_id: facultyId ?? foundSubject?.faculty_id,
                dpto_academic_id: dpto_academicId ?? foundSubject?.dpto_academic_id
            }
        )

        res.status(200).json({
            success: true,
            message: 'Subjects updated successfully'
        })
    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD DELETE SUBJECT BY ID
const deleteSubject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subject_id = parseId(req.params.id, 'subject')

        const foundSubject = await foundEntity<Subjects>(Subjects, { id: subject_id }, 'Subject not found')

        if (!foundSubject?.isActive) {
            throw new badRequestError("Subject already deleted")
        }

        await Subjects.update(
            { id: subject_id },
            {
                isActive: false,
                deletedAt: new Date()
            }
        )

        res.status(200).json({
            success: true,
            message: 'Subject deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}

export {
    createSubject, getSubject, updateSubject, deleteSubject
}