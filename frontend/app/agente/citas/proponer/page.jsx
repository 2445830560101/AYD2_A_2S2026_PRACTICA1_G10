'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import RoleSidebar from '@/components/RoleSidebar';

export default function ProponerHorario() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const citaId = searchParams.get('id');
  
  const [formData, setFormData] = useState({
    fecha: '',
    hora: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'agente') {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    const fechaPropuesta = new Date(formData.fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaPropuesta < hoy) {
      alert('La fecha propuesta no puede ser anterior a la fecha actual');
      return;
    }

    
    console.log('Propuesta de horario:', formData);
    alert('Propuesta de horario enviada exitosamente');
    router.push('/agente/citas/solicitudes');
  };

  return (
    <div className="d-flex">
      <RoleSidebar role="agente" />

      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Proponer Horario de Cita</h1>
        <p className="mb-4">Sugiera una fecha y hora para realizar la visita</p>

        {citaId && (
          <div className="alert alert-info mb-4">
            <strong>ID de Solicitud:</strong> #{citaId}
          </div>
        )}

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="fecha" className="form-label">Fecha Propuesta *</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fecha"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="hora" className="form-label">Hora Propuesta *</label>
                  <input
                    type="time"
                    className="form-control"
                    id="hora"
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="alert alert-warning mb-3">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Nota:</strong> La fecha y hora propuesta debe ser posterior a la fecha actual.
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-send-check me-2"></i>Enviar Propuesta
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => router.back()}
                >
                  <i className="bi bi-x-circle me-2"></i>Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}