/**
 * SDR-5 y SDR-6: Validación de dominios de correo institucional
 */

export interface ValidationResult {
  allowed: boolean;
  message?: string;
}

/**
 * Verifica si un correo electrónico pertenece a un dominio permitido o es un correo específico permitido
 * @param email - Correo electrónico a validar
 * @param allowedDomains - Lista de dominios o correos completos permitidos
 * @returns true si el dominio/correo está permitido, false en caso contrario
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

  const emailLower = email.toLowerCase();

  // Extraer el dominio del email
  const emailParts = email.split('@');
  if (emailParts.length !== 2) {
    return false;
  }

  const domain = emailParts[1].toLowerCase();

  // Verificar si:
  // 1. El correo completo está en la lista (para correos específicos)
  // 2. El dominio está en la lista (para dominios institucionales)
  return allowedDomains.some((allowed) => {
    const allowedLower = allowed.toLowerCase();
    // Si contiene @, es un correo específico
    if (allowedLower.includes('@')) {
      return allowedLower === emailLower;
    }
    // Si no, es un dominio
    return allowedLower === domain;
  });
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
