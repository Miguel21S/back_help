import { badRequestError, conflictError, notFoundError } from "../../core/utils/errorStatusCodes";

// Función para normalizar texto (en JS)
export function normalizeVariable(str: string): string {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")  // quitar acentos
        .replace(/[\s\-_.]+/g, "")        // quitar espacios, guiones, puntos, etc.
        .toLowerCase();
}

// Función para convertir true/false del back/front
export const formatIsActive = (value: boolean) => {
    return value ? "Activo" : "Inactivo";
}

// Función para convertir true/false del front/back
export const parserIsActive = (value: string): boolean => {
    const status = value.toLowerCase()

    if (status === 'active') return true
    if (status === 'inactive') return false 
    throw new badRequestError("isActive must be 'active' or 'inactive'");
}
// formatIsActive(u.isActive)

// export const isvalidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)

// Función para validar email
export const validEmail = (email: string, errorMessage: string) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.toLowerCase().trim())
    if (!regexEmail) { throw new badRequestError(errorMessage) }
    return email.toLowerCase().trim()
}

// Función para validar password
export const validPassword = (password: string) => /^(?=.*\d)(?=.*[!\"#\$%&'()*+,-./:;<=>?@[\\\]^_])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/.test(password)

// Función para validar campos únicos
export async function ensureUnique<T>(entity: any, where: any, errorMessage: string) {
    const exists = await entity.findOne({ where })
    if (exists) {
        throw new conflictError(errorMessage)
    }
}

// Función para encontrar una entidad
export async function foundEntity<T>(entity: { findOne: Function }, where: any, errorMessage: string): Promise<T> {
    const exist = await entity.findOne({ where })
    if (!exist) { throw new notFoundError(errorMessage) }
    return exist;
}