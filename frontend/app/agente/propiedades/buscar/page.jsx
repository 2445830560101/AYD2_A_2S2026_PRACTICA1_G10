'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import RoleSidebar from '@/components/RoleSidebar';

export default function ActualizarPropiedad() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    direccion: '',
    precio: '',
    descripcion: '',
    habitaciones: '',
    banos: '',
    area: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'agente') {
      router.push('/');
    }
  }, [user, router]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchPerformed(true);
    
    
    const results = [
      { id: '1001', titulo: 'Departamento Moderno', direccion: 'Calle Principal 123', tipo: 'Apartamento', precio: '250000', descripcion: 'Hermoso departamento con vista al mar', habitaciones: '3', banos: '2', area: '120', estado: 'Activo' },
      { id: '1002', titulo: 'Casa Familiar', direccion: 'Avenida Central 456', tipo: 'Casa', precio: '380000', descripcion: 'Casa espaciosa con jardín', habitaciones: '4', banos: '3', area: '200', estado: 'Activo' }
    ].filter(prop => 
      prop.id.includes(searchTerm) || 
      prop.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.direccion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
    setFormData({
      titulo: property.titulo,
      direccion: property.direccion,
      precio: property.precio,
      descripcion: property.descripcion,
      habitaciones: property.habitaciones,
      banos: property.banos,
      area: property.area
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Datos actualizados:', formData);
    alert('Propiedad actualizada exitosamente');
  };

  return (
    <div className="d-flex">
      <RoleSidebar role="agente" />

      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Actualizar Propiedad</h1>
        <p className="mb-4">Busque una propiedad para modificar sus datos</p>

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

        {searchPerformed && !selectedProperty && (
          <div className="card mb-4">
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
                          <td>${parseInt(prop.precio).toLocaleString()}</td>
                          <td>
                            <span className={`badge ${prop.estado === 'Activo' ? 'bg-success' : 'bg-warning'}`}>
                              {prop.estado}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="btn btn-sm btn-primary"
                              onClick={() => handleSelectProperty(prop)}
                            >
                              Editar
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

        {selectedProperty && (
          <div className="card">
            <div className="card-header bg-warning text-dark">
              <h5 className="mb-0">Editando Propiedad: {selectedProperty.titulo}</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="titulo" className="form-label">Título *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="titulo"
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="direccion" className="form-label">Dirección *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="direccion"
                      value={formData.direccion}
                      onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="precio" className="form-label">Precio *</label>
                    <input
                      type="number"
                      className="form-control"
                      id="precio"
                      value={formData.precio}
                      onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="habitaciones" className="form-label">Habitaciones</label>
                    <input
                      type="number"
                      className="form-control"
                      id="habitaciones"
                      value={formData.habitaciones}
                      onChange={(e) => setFormData({ ...formData, habitaciones: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="banos" className="form-label">Baños</label>
                    <input
                      type="number"
                      className="form-control"
                      id="banos"
                      value={formData.banos}
                      onChange={(e) => setFormData({ ...formData, banos: e.target.value })}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="area" className="form-label">Área (m²)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="area"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">Descripción *</label>
                  <textarea
                    className="form-control"
                    id="descripcion"
                    rows="4"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success">
                    <i className="bi bi-check-circle me-2"></i>Actualizar Propiedad
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setSelectedProperty(null)}
                  >
                    <i className="bi bi-x-circle me-2"></i>Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}