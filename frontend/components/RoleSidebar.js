'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RoleSidebar({ role }) {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [propertySubMenu, setPropertySubMenu] = useState(false);
  const [appointmentSubMenu, setAppointmentSubMenu] = useState(false);
  const [analyticsSubMenu, setAnalyticsSubMenu] = useState(false);

  const handleLogout = () => {
    
    localStorage.removeItem('authToken');
    router.push('/');
  };

 
  if (role === 'agente') {
    return (
      <div className="sidebar bg-light border-end" style={{ width: '250px' }}>
        <div className="p-3">
          <h4 className="text-primary mb-4">Panel de Control</h4>
          
          {/* Menú Principal */}
          <ul className="nav flex-column">
            <li className="nav-item mb-1">
              <Link 
                href="/agente/dashboard" 
                className={`nav-link ${activeMenu === 'dashboard' ? 'active bg-primary text-white' : ''}`}
                onClick={() => setActiveMenu('dashboard')}
              >
                <i className="bi bi-speedometer me-2"></i> Dashboard
              </Link>
            </li>
            
            {/* Gestión de Propiedades */}
            <li className="nav-item mb-1">
              <a 
                href="#property" 
                className={`nav-link ${activeMenu === 'properties' ? 'active bg-primary text-white' : ''}`}
                onClick={() => {
                  setActiveMenu('properties');
                  setPropertySubMenu(!propertySubMenu);
                }}
              >
                <i className="bi bi-building me-2"></i> Gestión de Propiedades
                <i className={`bi ${propertySubMenu ? 'bi-chevron-down' : 'bi-chevron-right'} float-end`}></i>
              </a>
              
              {propertySubMenu && (
                <ul className="nav flex-column ms-3 mt-1">
                  <li className="nav-item">
                    <Link 
                      href="/agente/propiedades/registrar" 
                      className="nav-link"
                    >
                      <i className="bi bi-plus-circle me-2"></i> Registrar Propiedad
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      href="/agente/propiedades/buscar" 
                      className="nav-link"
                    >
                      <i className="bi bi-search me-2"></i> Buscar Propiedad
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      href="/agente/propiedades/actualizar" 
                      className="nav-link"
                    >
                      <i className="bi bi-pencil-square me-2"></i> Actualizar Propiedad
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      href="/agente/propiedades/eliminar" 
                      className="nav-link"
                    >
                      <i className="bi bi-trash me-2"></i> Eliminar Propiedad
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            
            {/* Solicitudes de Citas */}
            <li className="nav-item mb-1">
              <a 
                href="#appointments" 
                className={`nav-link ${activeMenu === 'appointments' ? 'active bg-primary text-white' : ''}`}
                onClick={() => {
                  setActiveMenu('appointments');
                  setAppointmentSubMenu(!appointmentSubMenu);
                }}
              >
                <i className="bi bi-calendar-check me-2"></i> Solicitudes de Citas
                <i className={`bi ${appointmentSubMenu ? 'bi-chevron-down' : 'bi-chevron-right'} float-end`}></i>
              </a>
              
              {appointmentSubMenu && (
                <ul className="nav flex-column ms-3 mt-1">
                  <li className="nav-item">
                    <Link 
                      href="/agente/citas/solicitudes" 
                      className="nav-link"
                    >
                      <i className="bi bi-list me-2"></i> Ver Solicitudes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      href="/agente/citas/rechazadas" 
                      className="nav-link"
                    >
                      <i className="bi bi-x-circle me-2"></i> Motivos de Rechazo
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      href="/agente/citas/proponer" 
                      className="nav-link"
                    >
                      <i className="bi bi-clock me-2"></i> Proponer Horario
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      href="/agente/citas/agendadas" 
                      className="nav-link"
                    >
                      <i className="bi bi-calendar me-2"></i> Citas Agendadas
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            
            {/* Gráficas y Estadísticas */}
            <li className="nav-item mb-1">
              <a 
                href="#analytics" 
                className={`nav-link ${activeMenu === 'analytics' ? 'active bg-primary text-white' : ''}`}
                onClick={() => {
                  setActiveMenu('analytics');
                  setAnalyticsSubMenu(!analyticsSubMenu);
                }}
              >
                <i className="bi bi-bar-chart me-2"></i> Gráficas y Estadísticas
                <i className={`bi ${analyticsSubMenu ? 'bi-chevron-down' : 'bi-chevron-right'} float-end`}></i>
              </a>
              
              {analyticsSubMenu && (
                <ul className="nav flex-column ms-3 mt-1">
                  <li className="nav-item">
                    <Link 
                      href="/agente/graficas/top-zonas" 
                      className="nav-link"
                    >
                      <i className="bi bi-geo-alt me-2"></i> Top 5 Zonas
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      href="/agente/graficas/top-tipos" 
                      className="nav-link"
                    >
                      <i className="bi bi-building me-2"></i> Top 3 Tipos de Inmuebles
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            
            {/* Cerrar sesión */}
            <li className="nav-item mt-3 pt-3 border-top">
              <a 
                href="#" 
                className="nav-link text-danger"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  
  
  return null;
}