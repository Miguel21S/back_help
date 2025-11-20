
import { NextFunction, Request, Response } from "express";


export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    try {
        if(req.tokenData?.roleName !== 'superAdmin'){
            res.status(401).json({
                success: false,
                message: 'Unauthorized access'
            })
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'unauthorized data'
        })
        return;
        
    }
}