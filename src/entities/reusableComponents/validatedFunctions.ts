import { badRequestError, conflictError } from "../../core/utils/errorStatusCodes";

// Función para normalizar texto (en JS)
export function normalizeVariable(str: string): string {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")  // quitar acentos
        .replace(/[\s\-_.]+/g, "")        // quitar espacios, guiones, puntos, etc.
        .toLowerCase();
}

export const formatIsActive = (value: boolean) => {
    return value ? "Activo" : "Inactivo";
}
// formatIsActive(u.isActive)

// export const isvalidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)

export const validEmail = (email: string, errorMessage: string) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.toLowerCase().trim())
    if(!regexEmail){ throw new badRequestError(errorMessage)}
    return email.toLowerCase().trim()
}

export const validPassword = (password: string) => /^(?=.*\d)(?=.*[!\"#\$%&'()*+,-./:;<=>?@[\\\]^_])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/.test(password)

export async function ensureUnique<T>(entity: any, where: any, errorMessage: string) {
    const exists = await entity.findOne({ where })
    if (exists) {
        throw new conflictError(errorMessage)
    }
}