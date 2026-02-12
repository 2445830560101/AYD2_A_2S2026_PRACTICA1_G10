'use client'

import { useState, useEffect } from 'react'
import RoleSidebar from '@/components/RoleSidebar'
import { Table, Badge, Button, Card, Modal, Form, Alert, Row, Col } from 'react-bootstrap'
import { get_agent_properties, create_property, update_property, delete_property, get_property_types, create_property_type } from '@/services/propertyAgentService'
import { Property } from "@/types/Property"

type PropertyFormData = {
    titulo: string;
    descripcion: string;
    direccion: string;
    precio: number;
    habitaciones: number;
    banos: number;
    metros_cuadrados: number;
    tipo_id: number;
}

export default function PropiedadesAgentePagel() {
    const [properties, setProperties] = useState<Property[]>([])
    const [propertyTypes, setPropertyTypes] = useState<{ id: number; nombre: string }[]>([])
    const [search, setSearch] = useState('')

    // Estados para Modales
    const [showPropertyModal, setShowPropertyModal] = useState(false)
    const [showTypeModal, setShowTypeModal] = useState(false)
    const [editingProperty, setEditingProperty] = useState<Property | null>(null)
    const [formData, setFormData] = useState<PropertyFormData>({
        titulo: '',
        descripcion: '',
        direccion: '',
        precio: 0,
        habitaciones: 0,
        banos: 0,
        metros_cuadrados: 0,
        tipo_id: 0
    })
    const [newTypeName, setNewTypeName] = useState('')
    const [message, setMessage] = useState<{ type: 'success' | 'danger', text: string } | null>(null)
    const [loading, setLoading] = useState(false)

    // Cargar propiedades y tipos
    const fetchData = async () => {
        try {
            const props = await get_agent_properties()
            const types = await get_property_types()
            setProperties(props)
            setPropertyTypes(types)
        } catch (error) {
            setMessage({ type: 'danger', text: 'Error al cargar datos' })
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const filtered = properties.filter(p => 
        p.titulo.toLowerCase().includes(search.toLowerCase()) ||
        p.direccion.toLowerCase().includes(search.toLowerCase())
    )

    // Manejo de modal de propiedades
    const handleOpenPropertyModal = (property?: Property) => {
        if (property) {
            setEditingProperty(property)
            setFormData({
                titulo: property.titulo,
                descripcion: property.descripcion || '',
                direccion: property.direccion,
                precio: property.precio,
                habitaciones: property.habitaciones || 0,
                banos: property.banos || 0,
                metros_cuadrados: property.metros_cuadrados || 0,
                tipo_id: 0
            })
        } else {
            setEditingProperty(null)
            setFormData({
                titulo: '',
                descripcion: '',
                direccion: '',
                precio: 0,
                habitaciones: 0,
                banos: 0,
                metros_cuadrados: 0,
                tipo_id: 0
            })
        }
        setShowPropertyModal(true)
    }

    const handleSaveProperty = async () => {
        if (!formData.titulo || !formData.direccion || formData.tipo_id === 0) {
            setMessage({ type: 'danger', text: 'Por favor completa los campos obligatorios' })
            return
        }

        setLoading(true)
        try {
            if (editingProperty) {
                await update_property(editingProperty.id, formData)
                setMessage({ type: 'success', text: 'Propiedad actualizada correctamente' })
            } else {
                await create_property(formData)
                setMessage({ type: 'success', text: 'Propiedad registrada correctamente' })
            }
            setShowPropertyModal(false)
            fetchData()
        } catch (error) {
            setMessage({ type: 'danger', text: error instanceof Error ? error.message : 'Error al guardar propiedad' })
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteProperty = async (id: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar esta propiedad?')) {
            try {
                await delete_property(id)
                setMessage({ type: 'success', text: 'Propiedad eliminada correctamente' })
                fetchData()
            } catch (error) {
                setMessage({ type: 'danger', text: error instanceof Error ? error.message : 'Error al eliminar propiedad' })
            }
        }
    }

    const handleCreateType = async () => {
        if (!newTypeName.trim()) {
            setMessage({ type: 'danger', text: 'Por favor ingresa un nombre de tipo' })
            return
        }

        setLoading(true)
        try {
            await create_property_type(newTypeName)
            setMessage({ type: 'success', text: 'Tipo de inmueble creado correctamente' })
            setNewTypeName('')
            setShowTypeModal(false)
            fetchData()
        } catch (error) {
            setMessage({ type: 'danger', text: error instanceof Error ? error.message : 'Error al crear tipo' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="d-flex bg-light min-vh-100">
            <RoleSidebar role="agente" />
            <div className="flex-grow-1 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary fw-bold">Gestión de Propiedades</h2>
                    <div className="d-flex gap-2">
                        <Button variant="success" onClick={() => handleOpenPropertyModal()}>
                            <i className="bi bi-plus-circle me-2"></i> Registrar Propiedad
                        </Button>
                        <Button variant="info" onClick={() => setShowTypeModal(true)}>
                            <i className="bi bi-tag me-2"></i> Agregar Tipo Inmueble
                        </Button>
                    </div>
                </div>

                {message && (
                    <Alert variant={message.type} onClose={() => setMessage(null)} dismissible className="mb-4">
                        {message.text}
                    </Alert>
                )}

                {/* Buscador */}
                <div className="mb-4">
                    <Form.Control
                        placeholder="Buscar por título o dirección..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="shadow-sm"
                    />
                </div>

                {/* Tabla de propiedades */}
                <Card className="shadow-sm border-0 rounded-4">
                    <Card.Body>
                        {filtered.length === 0 ? (
                            <p className="text-muted text-center py-4">No hay propiedades registradas</p>
                        ) : (
                            <Table responsive hover className="align-middle">
                                <thead className="bg-light">
                                    <tr>
                                        <th>Título</th>
                                        <th>Dirección</th>
                                        <th>Precio</th>
                                        <th>Hab.</th>
                                        <th>Baños</th>
                                        <th>M²</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map(property => (
                                        <tr key={property.id}>
                                            <td className="fw-bold">{property.titulo}</td>
                                            <td>{property.direccion}</td>
                                            <td>
                                                <Badge bg="success">
                                                    ${property.precio.toLocaleString()}
                                                </Badge>
                                            </td>
                                            <td>{property.habitaciones}</td>
                                            <td>{property.banos}</td>
                                            <td>{property.metros_cuadrados}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="warning"
                                                        onClick={() => handleOpenPropertyModal(property)}
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="danger"
                                                        onClick={() => handleDeleteProperty(property.id)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>

                {/* Modal Registrar/Actualizar Propiedad */}
                <Modal show={showPropertyModal} onHide={() => setShowPropertyModal(false)} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {editingProperty ? 'Actualizar Propiedad' : 'Registrar Nueva Propiedad'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Título *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formData.titulo}
                                            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                            placeholder="Ej: Casa en zona céntrica"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tipo de Inmueble *</Form.Label>
                                        <Form.Select
                                            value={formData.tipo_id}
                                            onChange={(e) => setFormData({ ...formData, tipo_id: parseInt(e.target.value) })}
                                        >
                                            <option value={0}>Seleccionar tipo...</option>
                                            {propertyTypes.map(type => (
                                                <option key={type.id} value={type.id}>{type.nombre}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Dirección *</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.direccion}
                                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                                    placeholder="Ej: Calle 5 Avenida 10"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                    placeholder="Describe las características principales..."
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Precio *</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={formData.precio}
                                            onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
                                            placeholder="0.00"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Metros Cuadrados</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={formData.metros_cuadrados}
                                            onChange={(e) => setFormData({ ...formData, metros_cuadrados: parseFloat(e.target.value) })}
                                            placeholder="0"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Habitaciones</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={formData.habitaciones}
                                            onChange={(e) => setFormData({ ...formData, habitaciones: parseInt(e.target.value) })}
                                            placeholder="0"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Baños</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={formData.banos}
                                            onChange={(e) => setFormData({ ...formData, banos: parseInt(e.target.value) })}
                                            placeholder="0"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowPropertyModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleSaveProperty} disabled={loading}>
                            {loading ? 'Guardando...' : editingProperty ? 'Actualizar' : 'Registrar'}
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Agregar Tipo de Inmueble */}
                <Modal show={showTypeModal} onHide={() => setShowTypeModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Tipo de Inmueble</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Nombre del Tipo</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTypeName}
                                onChange={(e) => setNewTypeName(e.target.value)}
                                placeholder="Ej: Casa, Apartamento, Terreno..."
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowTypeModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleCreateType} disabled={loading}>
                            {loading ? 'Creando...' : 'Crear Tipo'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}
