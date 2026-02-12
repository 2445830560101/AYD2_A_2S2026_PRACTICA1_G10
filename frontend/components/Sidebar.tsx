'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { label: 'Dashboard', path: '/dashboard/admin', icon: 'bi-speedometer2' },
    { label: 'Usuarios', path: '/dashboard/admin/usuarios', icon: 'bi-people' }
  ];

  return (
    <div
      className="d-flex flex-column p-3 text-bg-dark"
      style={{ width: '250px', minHeight: '100vh' }}
    >
      <h4 className="text-center mb-4">Admin</h4>

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
    </div>
  );
}
