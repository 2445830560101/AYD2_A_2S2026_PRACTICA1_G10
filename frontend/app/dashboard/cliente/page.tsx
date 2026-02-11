'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import RoleSidebar from '@/components/RoleSidebar';

export default function ClienteDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'cliente') {
      router.push('/');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="d-flex">
      <RoleSidebar role="cliente" />

      <div className="flex-grow-1 p-4">
        <h1>Dashboard Cliente</h1>
        <p>Consulta de propiedades</p>

        <div className="alert alert-success">
          Hola <strong>{user.name}</strong>
        </div>
      </div>
    </div>
  );
}
