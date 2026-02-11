'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import RoleSidebar from '@/components/RoleSidebar';

export default function CitasAgendadas() {
  const { user } = useAuth();
  const router = useRouter();
  const [citas, setCitas] = useState([
    { id: '2007', cliente: 'María González', propiedad: 'Departamento Moderno', fecha: '15/02/2026', hora: '10:00 AM', estado: 'Confirmada' },
    { id: '2008', cliente: 'Juan Pérez', propiedad: 'Casa Familiar', fecha: '18/02/2026', hora: '2:30 PM', estado: 'Confirmada' },
    { id: '2009', cliente: 'Pedro Ramírez', propiedad: 'Local Comercial', fecha: '20/02/2026', hora: '11:00 AM', estado: 'Confirmada' }
  ]);

  useEffect(() => {
    if (!user || user.role !== 'agente') {
      // router.push('/');
    }
  }, [user, router]);

  const handleVerDetalle = (cita) => {
    
    console.log('Ver detalle de cita:', cita);
    alert(`Detalle de cita ${cita.id}\nCliente: ${cita.cliente}\nPropiedad: ${cita.propiedad}\nFecha: ${cita.fecha} ${cita.hora}`);
  };

  return (
    <div className="d-flex">
      <RoleSidebar role="agente" />

      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Agenda de Citas</h1>
        <p className="mb-4">Consulte su agenda de compromisos confirmados</p>

        <div className="card">
          <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Citas Agendadas</h5>
            <span className="badge bg-light text-success">{citas.length} Citas</span>
          </div>
          <div className="card-body">
            {citas.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Cliente</th>
                      <th>Propiedad</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citas.map((cita) => (
                      <tr key={cita.id}>
                        <td>#{cita.id}</td>
                        <td>{cita.cliente}</td>
                        <td>{cita.propiedad}</td>
                        <td>{cita.fecha}</td>
                        <td>{cita.hora}</td>
                        <td>
                          <span className={`badge ${cita.estado === 'Confirmada' ? 'bg-success' : 'bg-warning'}`}>
                            {cita.estado}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-sm btn-primary"
                            onClick={() => handleVerDetalle(cita)}
                          >
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
                <i className="bi bi-calendar-check fs-1 text-muted mb-3 d-block"></i>
                <p className="text-muted">No hay citas agendadas</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}