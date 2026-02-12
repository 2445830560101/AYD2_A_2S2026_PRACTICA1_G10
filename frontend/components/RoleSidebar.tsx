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
                                className={`nav-link ${pathname === '/dashboard/agente' ? 'active bg-primary text-white' : 'text-dark'}`}
                            >
                                <i className="bi bi-speedometer2 me-2"></i> Dashboard
                            </Link>
                        </li>

                        {/* Gestión de Propiedades (Con Submenú) */}
                        <li className="nav-item mb-1">
                            <Link
                                href="/agente/propiedades"
                                className={`nav-link ${pathname === '/agente/propiedades' ? 'active bg-primary text-white' : 'text-dark'}`}
                            >
                                <i className="bi bi-house-door me-2"></i> Gestión Propiedades
                            </Link>
                        </li>
                        
                        {/* Solicitudes de Citas */}
                        <li className="nav-item mb-1">
                            <Link
                                href="/agente/citas"
                                className={`nav-link ${pathname === '/agente/citas' ? 'active bg-primary text-white' : 'text-dark'}`}
                            >
                                <i className="bi bi-calendar-check me-2"></i> Citas
                            </Link>
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
    else if (role === 'admin') {
        return (
            <div className="sidebar bg-light border-end" style={{ width: '275px', minHeight: '100vh' }}>
                <div className="d-flex flex-column h-100 p-3">
                    <h4 className="text-primary mb-4">Administrador</h4>

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
    else if (role === 'cliente') {
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