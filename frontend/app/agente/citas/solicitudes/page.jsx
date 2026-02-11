'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import RoleSidebar from '@/components/RoleSidebar';

export default function VerSolicitudes() {
  const { user } = useAuth();
  const router = useRouter();
  const [solicitudes, setSolicitudes] = useState([
    { id: '2001', cliente: 'María González', propiedad: 'Departamento Moderno', fechaSolicitud: '10/02/2026', estado: 'Pendiente' },
    { id: '2002', cliente: 'Juan Pérez', propiedad: 'Casa Familiar', fechaSolicitud: '11/02/2026', estado: 'Pendiente' },
    { id: '2003', cliente: 'Ana Rodríguez', propiedad: 'Local Comercial', fechaSolicitud: '09/02/2026', estado: 'Pendiente' }
  ]);

  useEffect(() => {
    if (!user || user.role !== 'agente') {
      router.push('/');
    }
  }, [user, router]);

  const handleProponerHorario = (id) => {
    router.push(`/agente/citas/proponer?id=${id}`);
  };

  return (
    <div className="d-flex">
      <RoleSidebar role="agente" />

      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Bandeja de Citas</h1>
        <p className="mb-4">Consulte y gestione las solicitudes de citas de sus clientes</p>

        <div className="card">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Solicitudes de Citas</h5>
            <span className="badge bg-light text-primary">{solicitudes.length} Solicitudes</span>
          </div>
          <div className="card-body">
            {solicitudes.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Cliente</th>
                      <th>Propiedad</th>
                      <th>Fecha de Solicitud</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitudes.map((solicitud) => (
                      <tr key={solicitud.id}>
                        <td>#{solicitud.id}</td>
                        <td>{solicitud.cliente}</td>
                        <td>{solicitud.propiedad}</td>
                        <td>{solicitud.fechaSolicitud}</td>
                        <td>
                          <span className={`badge ${solicitud.estado === 'Pendiente' ? 'bg-warning' : solicitud.estado === 'Confirmada' ? 'bg-success' : 'bg-danger'}`}>
                            {solicitud.estado}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-sm btn-primary me-1"
                            onClick={() => handleProponerHorario(solicitud.id)}
                          >
                            <i className="bi bi-clock me-1"></i>Proponer Horario
                          </button>
                          <button className="btn btn-sm btn-info">
                            <i className="bi bi-eye me-1"></i>Ver Detalle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5">
                <i className="bi bi-inbox fs-1 text-muted mb-3 d-block"></i>
                <p className="text-muted">No hay solicitudes de citas pendientes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}