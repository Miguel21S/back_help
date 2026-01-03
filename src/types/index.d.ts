
export type TokenData = {
    roleId: number;
    roleName: string;
    permissions: string;
    userPermissions
}

declare global{
    namespace Express {
        export interface Request {
            tokenData: TokenData;
        }
    }
}