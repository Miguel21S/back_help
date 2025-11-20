
export type TokenData = {
    roleId: number;
    roleName: string;
}

declare global{
    namespace Express {
        export interface Request {
            tokenData: TokenData;
        }
    }
}