'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import RoleSidebar from '@/components/RoleSidebar';

export default function AgenteDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.rol !== 'agente') {
      // router.push('/');
    }
  }, [user, router]);

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
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Resumen de Propiedades</h5>
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <p className="card-text">Propiedades Registradas</p>
                    <h3 className="fw-bold">12</h3>
                  </div>
                  <div>
                    <p className="card-text">Propiedades Activas</p>
                    <h3 className="fw-bold">10</h3>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="card-text">Propiedades Pendientes</p>
                    <h3 className="fw-bold">2</h3>
                  </div>
                  <div>
                    <p className="card-text">Propiedades Eliminadas</p>
                    <h3 className="fw-bold">5</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de citas */}
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Resumen de Citas</h5>
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <p className="card-text">Solicitudes Pendientes</p>
                    <h3 className="fw-bold">8</h3>
                  </div>
                  <div>
                    <p className="card-text">Citas Confirmadas</p>
                    <h3 className="fw-bold">15</h3>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="card-text">Citas Rechazadas</p>
                    <h3 className="fw-bold">3</h3>
                  </div>
                  <div>
                    <p className="card-text">Citas Agendadas</p>
                    <h3 className="fw-bold">12</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Propiedades recientes */}
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Propiedades Recientes</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Dirección</th>
                    <th>Tipo</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#1001</td>
                    <td>Departamento Moderno</td>
                    <td>Calle Principal 123</td>
                    <td>Apartamento</td>
                    <td>$250,000</td>
                    <td><span className="badge bg-success">Activo</span></td>
                    <td>
                      <button className="btn btn-sm btn-primary me-1">Ver</button>
                      <button className="btn btn-sm btn-warning me-1">Editar</button>
                      <button className="btn btn-sm btn-danger">Eliminar</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#1002</td>
                    <td>Casa Familiar</td>
                    <td>Avenida Central 456</td>
                    <td>Casa</td>
                    <td>$380,000</td>
                    <td><span className="badge bg-success">Activo</span></td>
                    <td>
                      <button className="btn btn-sm btn-primary me-1">Ver</button>
                      <button className="btn btn-sm btn-warning me-1">Editar</button>
                      <button className="btn btn-sm btn-danger">Eliminar</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#1003</td>
                    <td>Local Comercial</td>
                    <td>Plaza Comercial 789</td>
                    <td>Local Comercial</td>
                    <td>$150,000</td>
                    <td><span className="badge bg-warning">Pendiente</span></td>
                    <td>
                      <button className="btn btn-sm btn-primary me-1">Ver</button>
                      <button className="btn btn-sm btn-warning me-1">Editar</button>
                      <button className="btn btn-sm btn-danger">Eliminar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Citas recientes */}
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Citas Recientes</h5>
          </div>
          <div className="card-body">
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
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#2001</td>
                    <td>María González</td>
                    <td>Departamento Moderno</td>
                    <td>15/02/2026</td>
                    <td>10:00 AM</td>
                    <td><span className="badge bg-success">Confirmada</span></td>
                    <td>
                      <button className="btn btn-sm btn-primary">Ver</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#2002</td>
                    <td>Juan Pérez</td>
                    <td>Casa Familiar</td>
                    <td>18/02/2026</td>
                    <td>2:30 PM</td>
                    <td><span className="badge bg-warning">Pendiente</span></td>
                    <td>
                      <button className="btn btn-sm btn-primary">Ver</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#2003</td>
                    <td>Ana Rodríguez</td>
                    <td>Local Comercial</td>
                    <td>20/02/2026</td>
                    <td>11:00 AM</td>
                    <td><span className="badge bg-danger">Rechazada</span></td>
                    <td>
                      <button className="btn btn-sm btn-primary">Ver</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
