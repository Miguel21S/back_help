import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { TokenData } from "../../types";


export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({
                sucess: false,
                message: "Usuario no autorizado"
            })
            return
        }

        //VERIFICACIÓN DEL TOKEN
        const decode = Jwt.verify(
            token,
            process.env.JWT_SECRET as string
        )

        req.tokenData = decode as TokenData;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error token no valido"
        })
        return
    }
}