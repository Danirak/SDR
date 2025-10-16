'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Sistema de Reserva de Sala de Estudio
              </h1>
              <p className="text-gray-600">
                Bienvenido, {session.user?.name || session.user?.email}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg
                className="w-6 h-6 text-green-600 mr-3 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="text-green-900 font-semibold mb-1">
                  Acceso Concedido
                </h3>
                <p className="text-green-700 text-sm">
                  Tu correo institucional ha sido verificado exitosamente.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-gray-600 text-sm">{session.user?.email}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Estado</h3>
              <p className="text-green-600 text-sm font-medium">Autenticado</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Método</h3>
              <p className="text-gray-600 text-sm">Google SSO</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Próximas funcionalidades
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="text-indigo-600 mr-2">•</span>
              Visualización de calendario semanal
            </li>
            <li className="flex items-center">
              <span className="text-indigo-600 mr-2">•</span>
              Reserva de bloques horarios
            </li>
            <li className="flex items-center">
              <span className="text-indigo-600 mr-2">•</span>
              Gestión de reservas personales
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
