
import { NextFunction, Request, Response } from "express";
import { authorizationError } from "../utils/errorStatusCodes";

export const checkAccess = (requiredPermission: string, allowedRoles: string[]=[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const role = req.tokenData?.roleName;

        const permissions: string[] = Array.isArray(req.tokenData?.permissions)
            ? req.tokenData.permissions
            : [];

        const hasPermission = !requiredPermission || permissions.includes(requiredPermission);
        const roleAllowed = allowedRoles.length === 0 || allowedRoles.includes(role);

        if (!hasPermission || !roleAllowed) {
            throw new authorizationError("Unauthorized access")
        }

        next();
    };
};
