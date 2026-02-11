'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

type Role = 'admin' | 'agente' | 'cliente';

export default function RoleSidebar({ role }: { role: Role }) {
    const router = useRouter();
    const pathname = usePathname(); // Útil para detectar la ruta activa automáticamente

    // Estados para submenús del agente
    const [activeMenu, setActiveMenu] = useState('dashboard')
    const [propertySubMenu, setPropertySubMenu] = useState(true)
    const [appointmentSubMenu, setAppointmentSubMenu] = useState(false)
    const [analyticsSubMenu, setAnalyticsSubMenu] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        router.push('/')
    };

    // --- VISTA AGENTE ---
    if (role === 'agente') {
        return (
            <div className="sidebar bg-light border-end" style={{ width: '275px', minHeight: '100vh' }}>
                <div className="p-3">
                    <h4 className="text-primary mb-4">Panel Agente</h4>

                    <ul className="nav flex-column">
                        {/* Dashboard */}
                        <li className="nav-item mb-1">
                            <Link
                                href="/dashboard/agente"
                                className={`nav-link ${activeMenu === 'dashboard' ? 'active bg-primary text-white' : 'text-dark'}`}
                                onClick={() => setActiveMenu('dashboard')}
                            >
                                <i className="bi bi-speedometer2 me-2"></i> Dashboard
                            </Link>
                        </li>

                        {/* Gestión de Propiedades (Con Submenú) */}
                        <li className="nav-item mb-1">
                            <a
                                href="#property"
                                className={`nav-link ${activeMenu === 'properties' ? 'active bg-primary text-white' : 'text-dark'}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveMenu('properties');
                                    setPropertySubMenu(!propertySubMenu);
                                }}
                            >
                                <i className="bi bi-house-door me-2"></i> Gestión Propiedades
                                <i className={`bi ${propertySubMenu ? 'bi-chevron-down' : 'bi-chevron-right'} float-end`}></i>
                            </a>

                            {propertySubMenu && (
                                <ul className="nav flex-column ms-3 mt-1 small">
                                    <li className="nav-item">
                                        <Link href="/agente/propiedades/registrar" className="nav-link text-secondary">
                                            <i className="bi bi-plus-circle me-2"></i> Registrar
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/agente/propiedades/buscar" className="nav-link text-secondary">
                                            <i className="bi bi-search me-2"></i> Buscar
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            href="/agente/propiedades/actualizar"
                                            className="nav-link"
                                            onClick={() => setActiveMenu('properties')}
                                        >
                                            <i className="bi bi-pencil-square me-2"></i> Actualizar Propiedad
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            href="/agente/propiedades/eliminar"
                                            className="nav-link"
                                            onClick={() => setActiveMenu('properties')}
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
                                className={`nav-link ${activeMenu === 'appointments' ? 'active bg-primary text-white' : 'text-dark'}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveMenu('appointments');
                                    setAppointmentSubMenu(!appointmentSubMenu);
                                }}
                            >
                                <i className="bi bi-calendar-check me-2"></i> Citas
                                <i className={`bi ${appointmentSubMenu ? 'bi-chevron-down' : 'bi-chevron-right'} float-end`}></i>
                            </a>
                            {appointmentSubMenu && (
                                <ul className="nav flex-column ms-3 mt-1">
                                    <li className="nav-item">
                                        <Link
                                            href="/agente/citas/solicitudes"
                                            className="nav-link"
                                            onClick={() => setActiveMenu('appointments')}
                                        >
                                            <i className="bi bi-list-task me-2"></i> Ver Solicitudes
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            href="/agente/citas/rechazadas"
                                            className="nav-link"
                                            onClick={() => setActiveMenu('appointments')}
                                        >
                                            <i className="bi bi-x-circle me-2"></i> Motivos de Rechazo
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            href="/agente/citas/proponer"
                                            className="nav-link"
                                            onClick={() => setActiveMenu('appointments')}
                                        >
                                            <i className="bi bi-clock me-2"></i> Proponer Horario
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            href="/agente/citas/agendadas"
                                            className="nav-link"
                                            onClick={() => setActiveMenu('appointments')}
                                        >
                                            <i className="bi bi-calendar-event me-2"></i> Citas Agendadas
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
                                            onClick={() => setActiveMenu('analytics')}
                                        >
                                            <i className="bi bi-geo-alt me-2"></i> Top 5 Zonas
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            href="/agente/graficas/top-tipos"
                                            className="nav-link"
                                            onClick={() => setActiveMenu('analytics')}
                                        >
                                            <i className="bi bi-building me-2"></i> Top 3 Tipos de Inmuebles
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                    <div className="mt-auto pt-3 border-top">
                        <button
                            className="nav-link text-danger w-100 text-start bg-transparent border-0 px-0"
                            onClick={handleLogout}
                        >
                            <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- VISTA CLIENTE (NUEVA IMPLEMENTACIÓN) ---
    if (role === 'cliente') {
        return (
            <div className="sidebar bg-light border-end" style={{ width: '275px', minHeight: '100vh' }}>
                <div className="d-flex flex-column h-100 p-3">
                    <h4 className="text-primary mb-4">Mi Cuenta</h4>

                    <ul className="nav flex-column flex-grow-1 gap-1">

                        {/* 1. Buscar Propiedades */}
                        <li className="nav-item">
                            <Link
                                href="/dashboard/cliente"
                                className={`nav-link ${pathname === '/dashboard/cliente' ? 'active bg-primary text-white' : 'text-dark'}`}
                            >
                                <i className="bi bi-search me-2"></i> Buscar Propiedades
                            </Link>
                        </li>

                        {/* 2. Favoritos */}
                        <li className="nav-item">
                            <Link
                                href="/cliente/favoritos"
                                className={`nav-link ${pathname.includes('favoritos') ? 'active bg-primary text-white' : 'text-dark'}`}
                            >
                                <i className="bi bi-heart me-2"></i> Mis Favoritos
                            </Link>
                        </li>

                        {/* 3. Mis Citas */}
                        <li className="nav-item">
                            <Link
                                href="/cliente/citas"
                                className={`nav-link ${pathname.includes('citas') ? 'active bg-primary text-white' : 'text-dark'}`}
                            >
                                <i className="bi bi-calendar-check me-2"></i> Mis Citas
                            </Link>
                        </li>

                        {/* 4. Mi Perfil */}
                        <li className="nav-item">
                            <Link
                                href="/cliente/perfil"
                                className={`nav-link ${pathname.includes('perfil') ? 'active bg-primary text-white' : 'text-dark'}`}
                            >
                                <i className="bi bi-person-circle me-2"></i> Mi Perfil
                            </Link>
                        </li>

                    </ul>

                    {/* Logout Cliente */}
                    <div className="mt-auto pt-3 border-top">
                        <button
                            className="nav-link text-danger w-100 text-start bg-transparent border-0 px-0"
                            onClick={handleLogout}
                        >
                            <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}