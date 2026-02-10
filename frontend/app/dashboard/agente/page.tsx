'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import RoleSidebar from '@/components/RoleSidebar';

export default function AgenteDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'agente') {
      router.push('/');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="d-flex">
      <RoleSidebar role="agente" />

      <div className="flex-grow-1 p-4">
        <h1>Dashboard Agente</h1>
        <p>Gestión de propiedades y citas</p>

        <div className="alert alert-info">
          Bienvenido <strong>{user.name}</strong>
        </div>
      </div>
    </div>
  );
}
