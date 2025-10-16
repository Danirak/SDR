/**
 * SDR-5 y SDR-6: Validación de dominios de correo institucional
 */

export interface ValidationResult {
  allowed: boolean;
  message?: string;
}

/**
 * Verifica si un correo electrónico pertenece a un dominio permitido
 * @param email - Correo electrónico a validar
 * @param allowedDomains - Lista de dominios permitidos
 * @returns true si el dominio está permitido, false en caso contrario
 */
export function isAllowedDomain(email: string, allowedDomains: string[]): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Validar formato básico de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  // Extraer el dominio del email
  const emailParts = email.split('@');
  if (emailParts.length !== 2) {
    return false;
  }

  const domain = emailParts[1].toLowerCase();

  // Verificar si el dominio está en la lista de permitidos (case-insensitive)
  return allowedDomains.some(
    (allowedDomain) => allowedDomain.toLowerCase() === domain
  );
}

/**
 * Valida un correo electrónico y retorna un resultado con mensaje
 * @param email - Correo electrónico a validar
 * @param allowedDomains - Lista de dominios permitidos
 * @returns Objeto con resultado de validación y mensaje
 */
export function validateUserEmail(
  email: string,
  allowedDomains: string[]
): ValidationResult {
  const allowed = isAllowedDomain(email, allowedDomains);

  if (allowed) {
    return {
      allowed: true,
      message: 'Acceso permitido',
    };
  }

  return {
    allowed: false,
    message: `Acceso denegado: El dominio no permitido. Solo se permiten correos de: ${allowedDomains.join(', ')}`,
  };
}
