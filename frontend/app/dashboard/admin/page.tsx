'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="d-flex">
      {/* Menú lateral */}
      <Sidebar />

      {/* Contenido */}
      <div className="flex-grow-1 p-4">
        <h1>Dashboard Administrador</h1>
        <p>Acceso total al sistema</p>

        <div className="alert alert-info mt-4">
          Bienvenido <strong>{user.name}</strong>
        </div>
      </div>
    </div>
  );
}
