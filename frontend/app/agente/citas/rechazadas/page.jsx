'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import RoleSidebar from '@/components/RoleSidebar';

export default function MotivosRechazo() {
  const { user } = useAuth();
  const router = useRouter();
  const [showMotivoModal, setShowMotivoModal] = useState(false);
  const [motivoSeleccionado, setMotivoSeleccionado] = useState(null);

  const citasRechazadas = [
    { 
      id: '2004', 
      cliente: 'Carlos Méndez', 
      propiedad: 'Departamento Moderno', 
      fechaPropuesta: '12/02/2026', 
      horaPropuesta: '10:00 AM',
      motivo: 'El horario no me conviene, prefiero por la tarde',
      fechaRechazo: '11/02/2026'
    },
    { 
      id: '2005', 
      cliente: 'Laura Sánchez', 
      propiedad: 'Casa Familiar', 
      fechaPropuesta: '14/02/2026', 
      horaPropuesta: '2:00 PM',
      motivo: 'Ya encontré otra propiedad que se ajusta mejor a mis necesidades',
      fechaRechazo: '11/02/2026'
    },
    { 
      id: '2006', 
      cliente: 'Roberto Díaz', 
      propiedad: 'Local Comercial', 
      fechaPropuesta: '13/02/2026', 
      horaPropuesta: '11:00 AM',
      motivo: 'El precio está por encima de mi presupuesto',
      fechaRechazo: '10/02/2026'
    }
  ];

  useEffect(() => {
    if (!user || user.role !== 'agente') {
      router.push('/');
    }
  }, [user, router]);

  const handleVerMotivo = (cita) => {
    setMotivoSeleccionado(cita);
    setShowMotivoModal(true);
  };

  return (
    <div className="d-flex">
      <RoleSidebar role="agente" />

      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Motivos de Rechazo</h1>
        <p className="mb-4">Consulte los motivos por los cuales los clientes rechazaron las propuestas de horario</p>

        <div className="card">
          <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Citas Rechazadas</h5>
            <span className="badge bg-light text-danger">{citasRechazadas.length} Rechazadas</span>
          </div>
          <div className="card-body">
            {citasRechazadas.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Cliente</th>
                      <th>Propiedad</th>
                      <th>Fecha Propuesta</th>
                      <th>Hora Propuesta</th>
                      <th>Fecha Rechazo</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citasRechazadas.map((cita) => (
                      <tr key={cita.id} className="table-danger">
                        <td>#{cita.id}</td>
                        <td>{cita.cliente}</td>
                        <td>{cita.propiedad}</td>
                        <td>{cita.fechaPropuesta}</td>
                        <td>{cita.horaPropuesta}</td>
                        <td>{cita.fechaRechazo}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-info"
                            onClick={() => handleVerMotivo(cita)}
                          >
                            <i className="bi bi-chat-left-text me-1"></i>Ver Motivo
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5">
                <i className="bi bi-check-circle fs-1 text-success mb-3 d-block"></i>
                <p className="text-muted">No hay citas rechazadas</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal de Motivo */}
        {showMotivoModal && motivoSeleccionado && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-info text-white">
                  <h5 className="modal-title">
                    <i className="bi bi-chat-left-text me-2"></i>
                    Motivo de Rechazo
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={() => setShowMotivoModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Cliente:</label>
                    <p className="mb-1">{motivoSeleccionado.cliente}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Propiedad:</label>
                    <p className="mb-1">{motivoSeleccionado.propiedad}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Fecha Propuesta:</label>
                    <p className="mb-1">{motivoSeleccionado.fechaPropuesta} - {motivoSeleccionado.horaPropuesta}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold text-danger">Motivo del Rechazo:</label>
                    <div className="alert alert-warning">
                      {motivoSeleccionado.motivo}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Fecha de Rechazo:</label>
                    <p className="mb-1">{motivoSeleccionado.fechaRechazo}</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => setShowMotivoModal(false)}
                  >
                    <i className="bi bi-check-circle me-2"></i>Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}