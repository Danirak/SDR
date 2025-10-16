'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = () => {
    switch (error) {
      case 'DomainNotAllowed':
        return {
          title: 'Dominio no permitido',
          description:
            'El correo electrónico que intentas usar no pertenece a un dominio institucional autorizado. Por favor, utiliza tu correo institucional para acceder al sistema.',
        };
      case 'AccessDenied':
        return {
          title: 'Acceso denegado',
          description:
            'No tienes permiso para acceder a este sistema. Contacta al administrador si crees que esto es un error.',
        };
      default:
        return {
          title: 'Error de autenticación',
          description:
            'Ocurrió un error durante el proceso de autenticación. Por favor, intenta nuevamente.',
        };
    }
  };

  const errorInfo = getErrorMessage();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-red-50 to-orange-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {errorInfo.title}
          </h1>
          <p className="text-gray-600">{errorInfo.description}</p>
        </div>

        <div className="space-y-4">
          <Link
            href="/auth/signin"
            className="block w-full text-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Intentar nuevamente
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
