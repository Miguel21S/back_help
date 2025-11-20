import { Request, Response, NextFunction } from "express";
import Joi from 'joi';

export const validateBody = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    } else {
        next();
    }
};