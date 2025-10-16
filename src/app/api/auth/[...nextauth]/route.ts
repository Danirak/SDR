import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { isAllowedDomain } from '@/lib/auth';

// Obtener dominios permitidos desde variables de entorno
const getAllowedDomains = (): string[] => {
  const domains = process.env.ALLOWED_EMAIL_DOMAINS || '';
  return domains.split(',').map((d) => d.trim()).filter((d) => d.length > 0);
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // SDR-5 y SDR-6: Validar dominio de correo
      if (!user.email) {
        return false;
      }

      const allowedDomains = getAllowedDomains();
      const allowed = isAllowedDomain(user.email, allowedDomains);

      if (!allowed) {
        // SDR-6: Deniega acceso y muestra mensaje
        console.log(`Access denied for ${user.email}. Domain not allowed.`);
        return '/auth/error?error=DomainNotAllowed';
      }

      // SDR-5: Concede acceso
      console.log(`Access granted for ${user.email}`);
      return true;
    },
    async session({ session, token }) {
      // Agregar información adicional a la sesión si es necesario
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
