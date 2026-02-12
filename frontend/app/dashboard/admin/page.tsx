'use client';

import { useState, useEffect } from 'react';
import RoleSidebar from '@/components/RoleSidebar';
import { Container, Table, Button, Card, Modal, Form, Alert } from 'react-bootstrap';
import { get_agents } from '@/services/agentService';
import { update_user, delete_user } from '@/services/userService'
import { User } from '@/types/User';
import { register_user } from '@/services/authService';
import { getImageUrl } from '@/utils/imageUtils'

export default function GestionAgentesPage() {
    const [agents, setAgents] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Estados para Modales
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showConfirmEditModal, setShowConfirmEditModal] = useState(false); // CU-02.01.02 Paso 4

    // Estado del Formulario (se usa para Crear y Editar)
    const [formData, setFormData] = useState({ id: 0, nombre_completo: '', correo: '', password: '' });
    const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // --- CU-02.01.03: Ver Agentes ---
    const fetchAgents = async () => {
        try {
            const data = await get_agents();
            setAgents(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        }
    }, [previewUrl])

    // Limpiar formulario
    const resetForm = () => {
        setFormData({ id: 0, nombre_completo: '', correo: '', password: '' });
        setPhotoFile(null);
        setPreviewUrl(null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhotoFile(file);
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
        }
    };

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await register_user(
                'Agente',
                formData.nombre_completo,
                formData.correo,
                formData.password,
                photoFile || undefined
            );
            await fetchAgents();
            setShowCreateModal(false);
            resetForm();
        } catch (err: any) {
            setError(err.message || 'Error al registrar cliente')
        } finally {
            setLoading(false)
        }
    };

    const handleEditClick = (agent: User) => {
        setFormData({
            id: agent.id,
            nombre_completo: agent.nombre_completo,
            correo: agent.correo, // Ajustado a 'email' según tu tipo User habitual
            password: '',
        })
        setPreviewUrl(agent.foto || null)
        setPhotoFile(null)
        setShowEditModal(true)
    };

    const handleEditPreSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setShowConfirmEditModal(true)
        setShowEditModal(false)
    };

    const handleConfirmEdit = async () => {
        try {
            await update_user(
                formData!.id,
                formData.nombre_completo,
                formData.password,
                (photoFile as any)
            )
            await fetchAgents()
            setShowConfirmEditModal(false)
            resetForm()
        } catch (err) {
            setError('Error al actualizar')
        }
    };

    const handleDeleteClick = (id: number) => {
        setSelectedAgentId(id)
        setShowDeleteModal(true)
    };

    const handleConfirmDelete = async () => {
        if (selectedAgentId) {
            await delete_user(selectedAgentId)
            await fetchAgents()
            setShowDeleteModal(false)
            setSelectedAgentId(null)
        }
    };

    return (
        <div className="d-flex bg-light min-vh-100">
            <RoleSidebar role="admin" />

            <Container className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="text-primary fw-bold">Gestión de Agentes</h2>
                        <p className="text-muted">Administración de personal inmobiliario</p>
                    </div>
                    <Button variant="primary" onClick={() => { resetForm(); setShowCreateModal(true); }}>
                        <i className="bi bi-person-plus-fill me-2"></i>
                        Registrar Nuevo Agente
                    </Button>
                </div>

                <Card className="shadow-sm border-0 rounded-4">
                    <Card.Body className="p-0">
                        <Table hover responsive className="table-borderless mb-0 align-middle">
                            <thead className="bg-light border-bottom">
                                <tr>
                                    <th className="ps-4">Nombre completo</th>
                                    <th>Correo Electrónico</th>
                                    <th className="text-end pe-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={4} className="text-center p-4">Cargando...</td></tr>
                                ) : agents.length === 0 ? (
                                    <tr><td colSpan={4} className="text-center p-4 text-muted">No hay agentes registrados</td></tr>
                                ) : (
                                    agents.map(agent => (
                                        <tr key={agent.id}>
                                            <td className="ps-4 fw-bold">
                                                <div className="d-flex align-items-center gap-2">
                                                    {agent.foto ? (
                                                        <img
                                                            src={agent.foto}
                                                            alt={agent.nombre_completo}
                                                            className="rounded-circle object-fit-cover"
                                                            style={{ width: 35, height: 35 }}
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none';
                                                                e.currentTarget.nextElementSibling?.classList.remove('d-none');
                                                            }}
                                                        />
                                                    ) : null}
                                                    <img
                                                        src={getImageUrl(agent.foto)}
                                                        alt={agent.nombre_completo}
                                                        className="rounded-circle object-fit-cover"
                                                        style={{ width: 35, height: 35 }}
                                                    />
                                                    {agent.nombre_completo}
                                                </div>
                                            </td>
                                            <td>{agent.correo}</td>
                                            <td className="text-end pe-4">
                                                <Button variant="link" className="text-primary p-0 me-3" onClick={() => handleEditClick(agent)}>
                                                    <i className="bi bi-pencil-square"></i> Editar
                                                </Button>
                                                <Button variant="link" className="text-danger p-0" onClick={() => handleDeleteClick(agent.id)}>
                                                    <i className="bi bi-trash"></i> Eliminar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>

            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar Agente</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleCreateSubmit}>
                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre Completo</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={formData.nombre_completo}
                                onChange={e => setFormData({ ...formData, nombre_completo: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                value={formData.correo}
                                onChange={e => setFormData({ ...formData, correo: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña Temporal</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fotografía de Perfil</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />

                            {previewUrl && (
                                <div className="mt-3 text-center">
                                    <div className="d-inline-block position-relative">
                                        <img
                                            src={getImageUrl(previewUrl)}
                                            alt="Previsualización"
                                            className="rounded-circle object-fit-cover border shadow-sm"
                                            style={{ width: 100, height: 100 }}
                                        />
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="position-absolute top-0 start-100 translate-middle rounded-circle p-0"
                                            style={{ width: 20, height: 20, fontSize: 10 }}
                                            onClick={() => {
                                                setPhotoFile(null)
                                                setPreviewUrl(null)
                                            }}
                                        >
                                            X
                                        </Button>
                                    </div>
                                    <p className="text-muted small mt-1">Vista previa</p>
                                </div>
                            )}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancelar</Button>
                        <Button variant="primary" type="submit">Registrar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Agente</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleEditPreSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre Completo</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={formData.nombre_completo}
                                onChange={e => setFormData({ ...formData, nombre_completo: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo Electrónico (No editable)</Form.Label>
                            <Form.Control type="email" value={formData.correo} disabled className="bg-light" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nueva Contraseña (Opcional)</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Dejar vacía para mantener actual"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fotografía de Perfil</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />

                            {previewUrl && (
                                <div className="mt-3 text-center">
                                    <div className="d-inline-block position-relative">
                                        <img
                                            src={getImageUrl(previewUrl)}
                                            alt="Previsualización"
                                            className="rounded-circle object-fit-cover border shadow-sm"
                                            style={{ width: 100, height: 100 }}
                                        />
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="position-absolute top-0 start-100 translate-middle rounded-circle p-0"
                                            style={{ width: 20, height: 20, fontSize: 10 }}
                                            onClick={() => {
                                                setPhotoFile(null)
                                                setPreviewUrl(null)
                                            }}
                                        >
                                            X
                                        </Button>
                                    </div>
                                    <p className="text-muted small mt-1">Vista previa</p>
                                </div>
                            )}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
                        <Button variant="primary" type="submit">Continuar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* --- MODAL CONFIRMACIÓN EDICIÓN (CU-02.01.02 Paso 4) --- */}
            <Modal show={showConfirmEditModal} onHide={() => setShowConfirmEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Cambios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Confirma que desea actualizar los datos de <strong>{formData.nombre_completo}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmEditModal(false)}>Rechazar</Button>
                    <Button variant="primary" onClick={handleConfirmEdit}>Aceptar</Button>
                </Modal.Footer>
            </Modal>

            {/* --- MODAL ELIMINAR (CU-02.01.04) --- */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton className="bg-danger text-white">
                    <Modal.Title>Eliminar Agente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Esta acción eliminará la cuenta del agente del sistema.</p>
                    <p className="fw-bold text-danger">¿Está seguro de continuar?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Rechazar</Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>Aceptar y Eliminar</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}