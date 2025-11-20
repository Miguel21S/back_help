
// Función para normalizar texto (en JS)
export function normalizeVariable(str: string): string {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")  // quitar acentos
        .replace(/[\s\-_.]+/g, "")        // quitar espacios, guiones, puntos, etc.
        .toLowerCase();
}
