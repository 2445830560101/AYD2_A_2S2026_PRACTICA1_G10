'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import RoleSidebar from '@/components/RoleSidebar';

export default function TopTipos() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'agente') {
      router.push('/');
    }
  }, [user, router]);

 
  const tiposData = [
    { tipo: 'Apartamento', cantidad: 65, icon: 'bi-building' },
    { tipo: 'Casa', cantidad: 48, icon: 'bi-house-door' },
    { tipo: 'Local Comercial', cantidad: 32, icon: 'bi-shop' }
  ];

  return (
    <div className="d-flex">
      <RoleSidebar role="agente" />

      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Top 3 Tipos de Inmuebles</h1>
        <p className="mb-4">Visualice las estadísticas de los 3 tipos de inmuebles más buscados</p>

        <div className="row">
          <div className="col-md-8 mb-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Gráfica de Tipos de Inmuebles</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                  <div className="w-100">
                    <canvas id="pieChart" width="400" height="400"></canvas>
                    <div className="text-center mt-3">
                      {tiposData.map((tipo, index) => {
                        const colors = ['#4CAF50', '#2196F3', '#FF9800'];
                        return (
                          <div key={index} className="d-inline-block me-3">
                            <span 
                              className="badge" 
                              style={{ 
                                backgroundColor: colors[index],
                                width: '20px',
                                height: '20px',
                                display: 'inline-block',
                                marginRight: '5px'
                              }}
                            ></span>
                            {tipo.tipo}
                          </div>
                        );
                      })}
                    </div>
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
                {tiposData.map((tipo, index) => {
                  const colors = ['success', 'primary', 'warning'];
                  const total = tiposData.reduce((sum, t) => sum + t.cantidad, 0);
                  const percentage = ((tipo.cantidad / total) * 100).toFixed(1);
                  
                  return (
                    <div key={index} className="mb-3 p-3 border rounded">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                          <i className={`${tipo.icon} fs-4 text-${colors[index]} me-2`}></i>
                          <span className="fw-bold">{tipo.tipo}</span>
                        </div>
                        <span className={`badge bg-${colors[index]}`}>#{index + 1}</span>
                      </div>
                      <div className="progress mb-2" style={{ height: '10px' }}>
                        <div 
                          className={`progress-bar bg-${colors[index]}`} 
                          role="progressbar" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <small>{tipo.cantidad} propiedades</small>
                        <small className="fw-bold">{percentage}%</small>
                      </div>
                    </div>
                  );
                })}
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
                    <th>Tipo de Inmueble</th>
                    <th>Número de Propiedades</th>
                    <th>Porcentaje del Total</th>
                    <th>Ícono</th>
                  </tr>
                </thead>
                <tbody>
                  {tiposData.map((tipo, index) => {
                    const total = tiposData.reduce((sum, t) => sum + t.cantidad, 0);
                    const percentage = ((tipo.cantidad / total) * 100).toFixed(2);
                    
                    return (
                      <tr key={index}>
                        <td>
                          <span className={`badge bg-${['success', 'primary', 'warning'][index]}`}>
                            #{index + 1}
                          </span>
                        </td>
                        <td>
                          <i className={`${tipo.icon} me-2`}></i>
                          {tipo.tipo}
                        </td>
                        <td>{tipo.cantidad}</td>
                        <td>{percentage}%</td>
                        <td>
                          <i className={`${tipo.icon} fs-4`}></i>
                        </td>
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