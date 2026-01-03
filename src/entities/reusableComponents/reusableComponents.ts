
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

export const validEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())

export const validPassword = (password: string) => /^(?=.*\d)(?=.*[!\"#\$%&'()*+,-./:;<=>?@[\\\]^_])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/.test(password)