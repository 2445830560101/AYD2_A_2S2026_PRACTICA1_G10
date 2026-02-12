'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import RoleSidebar from '@/components/RoleSidebar';
import { get_agent_properties } from '@/services/propertyAgentService';
import { get_appointment_requests, get_agent_scheduled_appointments } from '@/services/agentService';
import { ViewingStatus } from '@/types/Appointment';

export default function AgenteDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const [propiedadesTotal, setPropiedadesTotal] = useState(0);
  const [solicitudesPendientes, setSolicitudesPendientes] = useState(0);
  const [citasConfirmadas, setCitasConfirmadas] = useState(0);
  const [citasRechazadas, setCitasRechazadas] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.rol !== 'agente') {
      // router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Obtener propiedades
        const propiedades = await get_agent_properties();
        setPropiedadesTotal(propiedades.length);
        
        // Obtener solicitudes pendientes
        const solicitudes = await get_appointment_requests();
        setSolicitudesPendientes(solicitudes.filter(c => c.estado === ViewingStatus.PENDIENTE).length);
        
        // Obtener agenda (confirmadas y rechazadas)
        const agenda = await get_agent_scheduled_appointments();
        setCitasConfirmadas(agenda.filter(c => c.estado === ViewingStatus.CONFIRMADA).length);
        setCitasRechazadas(agenda.filter(c => c.estado === ViewingStatus.CANCELADA).length);
      } catch (error) {
        console.error('Error cargando datos del dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // if (!user) return null;

  return (
    <div className="d-flex">
      <RoleSidebar role="agente" />

      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Dashboard Agente</h1>
        <p className="mb-4">Gestión de propiedades y citas</p>

        <div className="alert alert-info mb-4">
          Bienvenido <strong>{user?.nombre_completo}</strong> - {user?.correo}
        </div>

        {/* Contenido principal del dashboard */}
        <div className="row">
          {/* Resumen de propiedades */}
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">
                  <i className="bi bi-house-door me-2"></i>
                  Resumen de Propiedades
                </h5>
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '150px' }}>
                    <div className="text-center">
                      <p className="card-text text-muted mb-2">Propiedades Registradas</p>
                      <h1 className="fw-bold text-success display-4">{propiedadesTotal}</h1>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Resumen de citas */}
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">
                  <i className="bi bi-calendar-check me-2"></i>
                  Resumen de Citas
                </h5>
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-around align-items-center" style={{ minHeight: '150px' }}>
                    <div className="text-center">
                      <p className="card-text text-muted mb-2">Pendientes</p>
                      <h2 className="fw-bold text-warning">{solicitudesPendientes}</h2>
                    </div>
                    <div className="text-center">
                      <p className="card-text text-muted mb-2">Confirmadas</p>
                      <h2 className="fw-bold text-success">{citasConfirmadas}</h2>
                    </div>
                    <div className="text-center">
                      <p className="card-text text-muted mb-2">Rechazadas</p>
                      <h2 className="fw-bold text-danger">{citasRechazadas}</h2>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
