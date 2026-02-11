'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import RoleSidebar from '@/components/RoleSidebar';

export default function EliminarPropiedad() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'agente') {
      router.push('/');
    }
  }, [user, router]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchPerformed(true);
    
   
    const results = [
      { id: '1001', titulo: 'Departamento Moderno', direccion: 'Calle Principal 123', tipo: 'Apartamento', precio: '$250,000', estado: 'Activo' },
      { id: '1002', titulo: 'Casa Familiar', direccion: 'Avenida Central 456', tipo: 'Casa', precio: '$380,000', estado: 'Activo' },
      { id: '1003', titulo: 'Local Comercial', direccion: 'Plaza Comercial 789', tipo: 'Local Comercial', precio: '$150,000', estado: 'Pendiente' }
    ].filter(prop => 
      prop.id.includes(searchTerm) || 
      prop.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.direccion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    
    console.log('Eliminando propiedad:', propertyToDelete.id);
    alert(`Propiedad ${propertyToDelete.titulo} eliminada exitosamente`);
    setShowConfirmModal(false);
    setPropertyToDelete(null);
    setSearchResults(searchResults.filter(p => p.id !== propertyToDelete.id));
  };

  return (
    <div className="d-flex">
      <RoleSidebar role="agente" />

      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Eliminar Propiedad</h1>
        <p className="mb-4">Busque una propiedad para eliminarla del sistema</p>

        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleSearch}>
              <div className="row mb-3">
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por ID, título o dirección..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-primary w-100">
                    <i className="bi bi-search me-2"></i>Buscar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {searchPerformed && (
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Resultados de la Búsqueda</h5>
            </div>
            <div className="card-body">
              {searchResults.length > 0 ? (
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
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((prop) => (
                        <tr key={prop.id}>
                          <td>{prop.id}</td>
                          <td>{prop.titulo}</td>
                          <td>{prop.direccion}</td>
                          <td>{prop.tipo}</td>
                          <td>{prop.precio}</td>
                          <td>
                            <span className={`badge ${prop.estado === 'Activo' ? 'bg-success' : 'bg-warning'}`}>
                              {prop.estado}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeleteClick(prop)}
                            >
                              <i className="bi bi-trash me-1"></i>Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-warning">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  No se encontraron propiedades con el criterio de búsqueda.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal de Confirmación */}
        {showConfirmModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-danger text-white">
                  <h5 className="modal-title">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Confirmar Eliminación
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={() => setShowConfirmModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>¿Está seguro de que desea eliminar la propiedad?</p>
                  <div className="alert alert-warning">
                    <strong>{propertyToDelete?.titulo}</strong><br />
                    Dirección: {propertyToDelete?.direccion}<br />
                    Precio: {propertyToDelete?.precio}
                  </div>
                  <p className="text-danger">
                    <strong>Esta acción no se puede deshacer.</strong>
                  </p>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowConfirmModal(false)}
                  >
                    <i className="bi bi-x-circle me-2"></i>Cancelar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={confirmDelete}
                  >
                    <i className="bi bi-check-circle me-2"></i>Sí, Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}