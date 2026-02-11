'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

type Role = 'admin' | 'agente' | 'cliente';

export default function RoleSidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const menuByRole = {
    agente: [
      { label: 'Dashboard*', path: '/dashboard/agente', icon: 'bi-speedometer2' },
      { label: 'Mis Propiedades', path: '/dashboard/agente/propiedades', icon: 'bi-house-door' }
    ],
    cliente: [
      { label: 'Buscar Propiedades', path: '/dashboard/cliente', icon: 'bi-search' },
      { label: 'Favoritos', path: '/dashboard/cliente/favoritos', icon: 'bi-heart' },
      { label: 'Mis Citas', path: '/dashboard/cliente/citas', icon: 'bi-calendar-check' },
      { label: 'Mi Perfil', path: '/dashboard/cliente/perfil', icon: 'bi-person' }
    ],
    admin: []
  };

  const menu = menuByRole[role];

  return (
    <div
      className="d-flex flex-column p-3 text-bg-dark"
      style={{ width: '240px', minHeight: '100vh' }}
    >
      <h5 className="text-center mb-4 text-capitalize">{role}</h5>

      <ul className="nav nav-pills flex-column gap-1">
        {menu.map(item => (
          <li className="nav-item" key={item.path}>
            <Link
              href={item.path}
              className={`nav-link text-white ${
                pathname === item.path ? 'active bg-primary' : ''
              }`}
            >
              <i className={`bi ${item.icon} me-2`} />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {}
      <button
        className="btn btn-outline-light mt-auto"
        onClick={() => {
          logout();
          router.push('/');
        }}
      >
        <i className="bi bi-box-arrow-right me-2" />
        Cerrar sesión
      </button>
    </div>
  );
}
