import { isAllowedDomain, validateUserEmail } from './auth';

describe('Authentication - SDR-5: Acceso con dominio permitido', () => {
  const allowedDomains = ['institution.edu', 'university.com'];

  test('Dado que el usuario posee un correo institucional válido, cuando intenta iniciar sesión, entonces el sistema concede acceso', () => {
    const validEmail = 'student@institution.edu';
    expect(isAllowedDomain(validEmail, allowedDomains)).toBe(true);
  });

  test('Valida múltiples dominios permitidos', () => {
    expect(isAllowedDomain('user@institution.edu', allowedDomains)).toBe(true);
    expect(isAllowedDomain('user@university.com', allowedDomains)).toBe(true);
  });

  test('Valida correos con diferentes formatos válidos', () => {
    expect(isAllowedDomain('john.doe@institution.edu', allowedDomains)).toBe(true);
    expect(isAllowedDomain('jane_doe123@university.com', allowedDomains)).toBe(true);
  });
});

describe('Authentication - SDR-6: Acceso con dominio no permitido', () => {
  const allowedDomains = ['institution.edu', 'university.com'];

  test('Dado que el usuario posee un correo de dominio no autorizado, cuando intenta iniciar sesión, entonces el sistema deniega el acceso', () => {
    const invalidEmail = 'user@gmail.com';
    expect(isAllowedDomain(invalidEmail, allowedDomains)).toBe(false);
  });

  test('Muestra un mensaje claro de dominio no permitido', () => {
    const invalidEmail = 'user@yahoo.com';
    const result = validateUserEmail(invalidEmail, allowedDomains);

    expect(result.allowed).toBe(false);
    expect(result.message).toBeDefined();
    expect(result.message).toContain('dominio no permitido');
  });

  test('Rechaza dominios similares pero no exactos', () => {
    expect(isAllowedDomain('user@fake-institution.edu', allowedDomains)).toBe(false);
    expect(isAllowedDomain('user@institution.edu.fake.com', allowedDomains)).toBe(false);
  });

  test('Rechaza correos sin dominio válido', () => {
    expect(isAllowedDomain('invalid-email', allowedDomains)).toBe(false);
    expect(isAllowedDomain('', allowedDomains)).toBe(false);
    expect(isAllowedDomain('@institution.edu', allowedDomains)).toBe(false);
  });

  test('Es case-insensitive para dominios', () => {
    expect(isAllowedDomain('user@INSTITUTION.EDU', allowedDomains)).toBe(true);
    expect(isAllowedDomain('user@Institution.Edu', allowedDomains)).toBe(true);
  });
});
