'use client';

import { useState, useEffect } from 'react';
import { get_clients } from '@/services/clientService';
import { Client } from '@/types/User';
import RoleSidebar from '@/components/RoleSidebar';

export default function ClientesPage() {
    const [clientes, setClientes] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadClientes();
    }, []);

    const loadClientes = async () => {
        try {
            setLoading(true);
            const data = await get_clients();
            setClientes(data);
        } catch (error) {
            console.error('Error al cargar clientes:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredClientes = clientes.filter((cliente) =>
        cliente.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.correo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="d-flex">
            <RoleSidebar role="agente" />

            <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container-fluid">
                    <h2 className="mb-4">
                        <i className="bi bi-people me-2"></i>
                        Lista de Clientes
                    </h2>

                    {/* Barra de búsqueda */}
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar por nombre o correo..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 text-end">
                            <span className="badge bg-primary fs-6">
                                Total: {filteredClientes.length} cliente{filteredClientes.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>

                    {/* Tabla de clientes */}
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="mt-3 text-muted">Cargando clientes...</p>
                        </div>
                    ) : filteredClientes.length === 0 ? (
                        <div className="alert alert-info text-center">
                            <i className="bi bi-info-circle me-2"></i>
                            {searchTerm ? 'No se encontraron clientes con ese criterio.' : 'No hay clientes registrados.'}
                        </div>
                    ) : (
                        <div className="card shadow-sm">
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="text-center" style={{ width: '80px' }}>ID</th>
                                                <th>Nombre Completo</th>
                                                <th>Correo Electrónico</th>
                                                <th className="text-center">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredClientes.map((cliente) => (
                                                <tr key={cliente.id}>
                                                    <td className="text-center fw-bold text-muted">
                                                        #{cliente.id}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                                                                style={{ width: '40px', height: '40px', fontSize: '18px', fontWeight: 'bold' }}>
                                                                {cliente.nombre_completo.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <div className="fw-semibold">{cliente.nombre_completo}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <i className="bi bi-envelope me-2 text-muted"></i>
                                                        {cliente.correo}
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="badge bg-success">
                                                            <i className="bi bi-check-circle me-1"></i>
                                                            Activo
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
