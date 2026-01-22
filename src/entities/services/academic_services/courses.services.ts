import { NextFunction, Request, Response } from "express";
import { badRequestError, conflictError } from "../../../core/utils/errorStatusCodes";
import { ensureUnique, foundEntity, parseId, parserIsActive } from "../../reusableComponents/validatedFunctions";
import { Courses } from "../../models/academic_models/Courses.models";
import { Subjects } from "../../models/academic_models/subjects.models";
import { Not } from "typeorm";

///////////////////////   METHOD CREATE COURSE
const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, academic_year, semester, state, subject_id } = req.body
        const requiredFields = { name, academic_year, semester, state, subject_id };

        for (const [field, value] of Object.entries(requiredFields)) {
            if (value === undefined || value === null || value.toString().trim() === '') {
                throw new badRequestError(`The ${field} field is mandatory and cannot be empty.`);
            }
        }

        const normalizedState = state.toUpperCase().trim();
        const validStates = ['OPEN', 'CLOSED'];
        const subjectId = parseId(subject_id, 'subject')

        await foundEntity<Subjects>(Subjects, { id: subjectId }, 'Subject not found');

        await ensureUnique(
            Courses,
            {
                semester,
                subject_id: subjectId
            },
            'The Course with semester and subject id, already exists'
        )

        if (!validStates.includes(normalizedState)) {
            throw new badRequestError("Invalid state  must be TYPE, 'OPEN', 'CLOSED'")
        }

        await Courses.save({
            name,
            academic_year,
            semester,
            state: normalizedState,
            subject_id: subjectId
        })

        res.status(201).json({
            success: true,
            message: 'Course created successfully'
        })
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            return next(new conflictError("The courses with the same, subject, semester already exists."))
        }
        next(error)
    }
}

///////////////////////   METHOD RETURNING LIST OF COURSES
const getCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listCourses = await Courses.find({
            relations: ['subjects'],
            select: {
                name: true,
                academic_year: true,
                semester: true,
                state: true,
                isActive: true,
                subjects: {
                    name: true
                }
            }
        })

        res.status(200).json({
            success: true,
            message: 'Courses retrieved successfully',
            data: listCourses
        })
    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD UPDATE COURSE BY ID
const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, academic_year, semester, state, isActive, subject_id } = req.body
        const course_id = parseId(req.params.id, 'course');

        const validStates = ['OPEN', 'CLOSED'];

        let subjctId = subject_id;
        let states = state;
        let active: boolean | undefined

        const foundCourse = await foundEntity<Courses>(Courses, { id: course_id }, 'Course not found')

        if (subject_id !== undefined) {
            const subjct = parseId(subject_id, 'subject')
            await foundEntity<Subjects>(Subjects, { id: subjct }, 'Subjects not found')
            subjctId = subjct
        }

        await ensureUnique(
            Courses,
            {
                semester: semester ?? foundCourse?.semester,
                subject_id: subjctId ?? foundCourse?.subject_id,
                id: Not(course_id)
            },
            'The Course with semester and subject id already exists'
        )

        if (state !== undefined) {
            if (typeof (state) !== 'string') {
                throw new badRequestError("State must be a string");
            }
            const normalizedState = state.toUpperCase().trim();
            if (!validStates.includes(normalizedState)) {
                throw new badRequestError("Invalid state  must be TYPE, 'OPEN', 'CLOSED'")
            }
            states = normalizedState
        }

        if (isActive !== undefined && typeof (isActive) === 'string') {
            active = parserIsActive(isActive)
        }

        await Courses.update(
            { id: course_id },
            {
                name: name ?? foundCourse?.name,
                academic_year: academic_year ?? foundCourse?.academic_year,
                semester: semester ?? foundCourse?.semester,
                state: states ?? foundCourse?.state,
                isActive: active ?? foundCourse?.isActive,
                subject_id: subjctId ?? foundCourse?.subject_id
            }
        )

        res.status(200).json({
            success: true,
            message: 'Course updated successfully'
        })
    } catch (error) {
        next(error)
    }
}

///////////////////////   METHOD DELETE COURSE BY ID
const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const course_id = parseId(req.params.id, 'course');

        const foundCourse = await foundEntity<Courses>(Courses, { id: course_id }, 'Course not found')

        if (!foundCourse?.isActive) {
            throw new badRequestError("Courses already deleted")
        }

        await Courses.update(
            { id: course_id },
            {
                isActive: false,
                deletedAt: new Date()
            }
        )

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}

export {
    createCourse, getCourse, updateCourse, deleteCourse
}