'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import RoleSidebar from '@/components/RoleSidebar';
import { useToast } from '@/context/ToastContext';
import axios from 'axios';

export default function RegistrarPropiedad() {
  const { user } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const [propertyType, setPropertyType] = useState('');
  const [formData, setFormData] = useState({
    titulo: '',
    direccion: '',
    precio: '',
    descripcion: '',
    habitaciones: '',
    banos: '',
    area: '',
    fotos: []
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'agente') {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('titulo', formData.titulo);
      formDataToSend.append('direccion', formData.direccion);
      formDataToSend.append('precio', formData.precio);
      formDataToSend.append('descripcion', formData.descripcion);
      formDataToSend.append('tipo', propertyType);
      formDataToSend.append('habitaciones', formData.habitaciones || '');
      formDataToSend.append('banos', formData.banos || '');
      formDataToSend.append('area', formData.area || '');
      formDataToSend.append('agente_id', user.id);

      // Añadir fotos
      Array.from(formData.fotos).forEach((file, index) => {
        formDataToSend.append(`fotos[${index}]`, file);
      });

      // Configurar axios con timeout y headers
      const response = await axios.post(
        'http://localhost:3001/api/propiedades/registrar',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000 
        }
      );

      showToast(' Propiedad registrada exitosamente', 'success', 3000);
      
      setTimeout(() => {
        setFormData({
          titulo: '',
          direccion: '',
          precio: '',
          descripcion: '',
          habitaciones: '',
          banos: '',
          area: '',
          fotos: []
        });
        setPropertyType('');
        setIsLoading(false);
      }, 2000);

    } catch (error) {
      setIsLoading(false);
      
      if (error.response) {
        // Error de respuesta del servidor
        const errorMessage = error.response.data.message || 
                           error.response.data.error || 
                           'Error en el servidor';
        showToast(` ${errorMessage}`, 'error', 4000);
      } else if (error.request) {
        // Error de red - no hay respuesta
        showToast(' No se pudo conectar con el servidor', 'error', 4000);
      } else {
        // Otro error
        showToast(` ${error.message}`, 'error', 4000);
      }
      
      console.error('Error:', error);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, fotos: files });
    showToast(` ${files.length} archivo(s) seleccionado(s)`, 'info', 2000);
  };

  return (
    <div className="d-flex">
      <RoleSidebar role="agente" />

      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Registrar Nueva Propiedad</h1>
        <p className="mb-4">Complete el formulario para crear un nuevo anuncio</p>

        <div className="card">
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
                    disabled={isLoading}
                    placeholder="Ej: Departamento Moderno en Centro"
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
                    disabled={isLoading}
                    placeholder="Calle, número, colonia, ciudad"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="precio" className="form-label">Precio *</label>
                  <div className="input-group">
                    <span className="input-group-text">Q</span>
                    <input
                      type="number"
                      className="form-control"
                      id="precio"
                      value={formData.precio}
                      onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                      required
                      min="1"
                      disabled={isLoading}
                      placeholder="0.00"
                    />
                    <span className="input-group-text">USD</span>
                  </div>
                  <small className="form-text text-muted">Precio en dólares estadounidenses</small>
                </div>
                <div className="col-md-6">
                  <label htmlFor="tipo" className="form-label">Tipo de Inmueble *</label>
                  <select
                    className="form-select"
                    id="tipo"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    required
                    disabled={isLoading}
                  >
                    <option value="">Seleccione un tipo</option>
                    <option value="casa"> Casa</option>
                    <option value="apartamento"> Apartamento</option>
                    <option value="terreno"> Terreno</option>
                    <option value="local"> Local Comercial</option>
                  </select>
                </div>
              </div>

              {propertyType && (
                <>
                  {propertyType !== 'terreno' && (
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="habitaciones" className="form-label"> Habitaciones</label>
                        <input
                          type="number"
                          className="form-control"
                          id="habitaciones"
                          value={formData.habitaciones}
                          onChange={(e) => setFormData({ ...formData, habitaciones: e.target.value })}
                          min="0"
                          disabled={isLoading}
                          placeholder="0"
                        />
                        <small className="form-text text-muted">Número de habitaciones</small>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="banos" className="form-label"> Baños</label>
                        <input
                          type="number"
                          className="form-control"
                          id="banos"
                          value={formData.banos}
                          onChange={(e) => setFormData({ ...formData, banos: e.target.value })}
                          min="0"
                          disabled={isLoading}
                          placeholder="0"
                        />
                        <small className="form-text text-muted">Número de baños completos</small>
                      </div>
                    </div>
                  )}

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="area" className="form-label"> Área (m²)</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          id="area"
                          value={formData.area}
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          min="1"
                          disabled={isLoading}
                          placeholder="0"
                        />
                        <span className="input-group-text">m²</span>
                      </div>
                      <small className="form-text text-muted">Superficie total en metros cuadrados</small>
                    </div>
                  </div>
                </>
              )}

              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label"> Descripción *</label>
                <textarea
                  className="form-control"
                  id="descripcion"
                  rows="5"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  required
                  disabled={isLoading}
                  placeholder="Describa las características principales de la propiedad, amenities, ubicación, estado, etc."
                ></textarea>
                <small className="form-text text-muted">
                  Incluya detalles importantes como: estado de la propiedad, amenities, cercanías, 
                  características especiales, etc.
                </small>
              </div>

              <div className="mb-4">
                <label htmlFor="fotos" className="form-label"> Subir Fotos</label>
                <input
                  type="file"
                  className="form-control"
                  id="fotos"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
                {formData.fotos.length > 0 && (
                  <div className="mt-2">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-images me-2 text-primary"></i>
                      <span className="badge bg-primary">
                        {formData.fotos.length} archivo(s) seleccionado(s)
                      </span>
                    </div>
                  </div>
                )}
                <small className="form-text text-muted">
                  Puede seleccionar múltiples imágenes. Formatos permitidos: JPG, JPEG, PNG, GIF
                </small>
              </div>

              <div className="alert alert-info mb-4">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Nota:</strong> Todos los campos marcados con * son obligatorios. 
                Las fotos son opcionales pero recomendadas para mejorar la visibilidad de la propiedad.
              </div>

              <div className="d-flex gap-2 flex-wrap">
                <button 
                  type="submit" 
                  className="btn btn-success"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      <span>Registrando Propiedad...</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-save me-2"></i>
                      <span>Guardar Propiedad</span>
                    </>
                  )}
                </button>
                
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    if (confirm('¿Desea cancelar el registro? Los datos no guardados se perderán.')) {
                      router.back();
                    }
                  }}
                  disabled={isLoading}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Cancelar
                </button>
                
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setFormData({
                      titulo: '',
                      direccion: '',
                      precio: '',
                      descripcion: '',
                      habitaciones: '',
                      banos: '',
                      area: '',
                      fotos: []
                    });
                    setPropertyType('');
                    showToast('🧹 Formulario limpiado exitosamente', 'info', 2000);
                  }}
                  disabled={isLoading}
                >
                  <i className="bi bi-eraser me-2"></i>
                  Limpiar Formulario
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Vista previa de fotos seleccionadas */}
        {formData.fotos.length > 0 && (
          <div className="card mt-4">
            <div className="card-header bg-light">
              <h6 className="mb-0">📸 Vista Previa de Fotos Seleccionadas</h6>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {Array.from(formData.fotos).map((file, index) => (
                  <div key={index} className="col-md-3 col-sm-6">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-file-earmark-image fs-1 mb-2 text-primary"></i>
                        <p className="mb-1 fw-bold text-truncate">{file.name}</p>
                        <p className="mb-0 text-muted small">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}