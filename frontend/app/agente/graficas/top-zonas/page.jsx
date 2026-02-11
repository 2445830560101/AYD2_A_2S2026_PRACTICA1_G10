'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import RoleSidebar from '@/components/RoleSidebar';

export default function TopZonas() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'agente') {
      router.push('/');
    }
  }, [user, router]);

 
  const zonasData = [
    { zona: 'Centro', propiedades: 45 },
    { zona: 'Norte', propiedades: 38 },
    { zona: 'Sur', propiedades: 32 },
    { zona: 'Este', propiedades: 28 },
    { zona: 'Oeste', propiedades: 22 }
  ];

  return (
    <div className="d-flex">
      <RoleSidebar role="agente" />

      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Top 5 Zonas con Mayor Oferta</h1>
        <p className="mb-4">Visualice las 5 zonas geográficas con más propiedades publicadas</p>

        <div className="row">
          <div className="col-md-8 mb-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Gráfica de Zonas</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                  <div className="w-100">
                    {zonasData.map((zona, index) => {
                      const percentage = (zona.propiedades / zonasData[0].propiedades) * 100;
                      const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336'];
                      
                      return (
                        <div key={index} className="mb-3">
                          <div className="d-flex justify-content-between mb-1">
                            <span className="fw-bold">{zona.zona}</span>
                            <span className="fw-bold">{zona.propiedades} propiedades</span>
                          </div>
                          <div className="progress" style={{ height: '25px' }}>
                            <div 
                              className="progress-bar" 
                              role="progressbar" 
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: colors[index],
                                transition: 'width 0.6s ease'
                              }}
                            >
                              {percentage.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Resumen de Datos</h5>
              </div>
              <div className="card-body">
                <div className="list-group">
                  {zonasData.map((zona, index) => {
                    const colors = ['success', 'primary', 'warning', 'info', 'danger'];
                    return (
                      <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <span className={`badge bg-${colors[index]} me-2`}>{index + 1}</span>
                          {zona.zona}
                        </div>
                        <span className="badge bg-secondary">{zona.propiedades}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Datos Detallados</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Posición</th>
                    <th>Zona</th>
                    <th>Número de Propiedades</th>
                    <th>Porcentaje del Total</th>
                  </tr>
                </thead>
                <tbody>
                  {zonasData.map((zona, index) => {
                    const total = zonasData.reduce((sum, z) => sum + z.propiedades, 0);
                    const percentage = ((zona.propiedades / total) * 100).toFixed(2);
                    
                    return (
                      <tr key={index}>
                        <td>
                          <span className={`badge bg-${['success', 'primary', 'warning', 'info', 'danger'][index]}`}>
                            #{index + 1}
                          </span>
                        </td>
                        <td>{zona.zona}</td>
                        <td>{zona.propiedades}</td>
                        <td>{percentage}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}