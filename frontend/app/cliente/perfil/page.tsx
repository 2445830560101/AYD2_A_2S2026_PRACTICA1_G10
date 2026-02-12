'use client'

import { useState, useEffect } from 'react'
import RoleSidebar from '@/components/RoleSidebar'
import { Container, Card, Form, Button, Image, Modal, Alert, Row, Col } from 'react-bootstrap'
import { useAuth } from '@/context/AuthContext'
import { update_user, delete_user } from '@/services/userService'
import { getImageUrl } from '@/utils/imageUtils'
import { useRouter } from 'next/navigation'

export default function PerfilPage() {
    const { user, login, logout } = useAuth(); // 'login' aquí se usa para actualizar el contexto
    const router = useRouter()
    // Estados del formulario
    const [formData, setFormData] = useState({
        nombre_completo: '',
        password: ''
    });
    const [photo, setPhoto] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Estados de Modales y Feedback
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'danger', text: string } | null>(null)

    // Cargar datos iniciales
    useEffect(() => {
        if (user) {
            setFormData({
                nombre_completo: user.nombre_completo || 'N/A',
                password: '',
            })
            setPreviewUrl(user.foto ?? null)
        }
    }, [user])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhoto(file);
            
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl); 
        }
    };

    const handleUpdateClick = (e: React.FormEvent) => {
        e.preventDefault()
        setShowUpdateModal(true)
    }

    const confirmUpdate = async () => {
        setLoading(true)
        setShowUpdateModal(false)
        setMessage(null)

        try {
            await update_user(
                user!.id,
                formData.nombre_completo,
                formData.password,
                (photo as any)
            )

            const usuarioActualizado = {
                ...user!,
                nombre_completo: formData.nombre_completo,
                foto: previewUrl || user!.foto
            }

            login(usuarioActualizado)
            setMessage({ type: 'success', text: 'Datos actualizados correctamente.' })
        } catch (error) {
            setMessage({ type: 'danger', text: 'Error al actualizar los datos.' })
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteClick = () => {
        setShowDeleteModal(true)
    }

    const confirmDelete = async () => {
        setLoading(true)
        try {
            await delete_user(user!.id);
            logout()
            setMessage({ type: 'success', text: 'Cuenta eliminada correctamente.' })
            router.push('/')
        } catch (error) {
            setShowDeleteModal(false)
            setMessage({ type: 'danger', text: 'No se pudo eliminar la cuenta.' })
            setLoading(false)
        }
    }

    return (
        <div className="d-flex bg-light min-vh-100">
            <RoleSidebar role="cliente" />
            <div className="flex-grow-1 p-4">

                <Container className="p-5 d-flex flex-column align-items-center">
                    <h2 className="text-primary fw-bold mb-4 w-100 text-center">Mi Perfil</h2>

                    {message && <Alert variant={message.type} onClose={() => setMessage(null)} dismissible className="w-100">{message.text}</Alert>}

                    <Card className="shadow-sm border-0 rounded-4 p-4" style={{ maxWidth: '700px', width: '100%' }}>
                        <Card.Body>
                            <Form onSubmit={handleUpdateClick}>

                                {/* Sección Foto */}
                                <div className="text-center mb-4">
                                    <div className="position-relative d-inline-block">
                                        <div
                                            className="rounded-circle overflow-hidden border border-3 border-white shadow"
                                            style={{ width: '150px', height: '150px', backgroundColor: '#e9ecef' }}
                                        >
                                            {previewUrl ? (
                                                <Image src={getImageUrl(previewUrl)} alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div className="d-flex align-items-center justify-content-center h-100 text-muted display-4">
                                                    <i className="bi bi-person"></i>
                                                </div>
                                            )}
                                        </div>
                                        <Form.Label
                                            className="position-absolute bottom-0 end-0 btn btn-primary btn-sm rounded-circle shadow-sm"
                                            style={{ width: '40px', height: '40px', lineHeight: '30px' }}
                                        >
                                            <i className="bi bi-camera-fill"></i>
                                            <Form.Control type="file" accept="image/*" className="d-none" onChange={handleImageChange} />
                                        </Form.Label>
                                    </div>
                                </div>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nombre Completo</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={formData.nombre_completo}
                                                onChange={(e) => setFormData({ ...formData, nombre_completo: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Correo Electrónico</Form.Label>
                                            <Form.Control type="email" value={user?.correo} disabled className="bg-light" />
                                            <Form.Text className="text-muted">El correo no se puede modificar.</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4">
                                    <Form.Label>Nueva Contraseña (Opcional)</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Dejar en blanco para mantener la actual"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-between align-items-center mt-4 border-top pt-4">
                                    {/* Botón Eliminar (CU-01.01.03) */}
                                    <Button variant="outline-danger" onClick={handleDeleteClick}>
                                        Eliminar Cuenta
                                    </Button>

                                    {/* Botón Guardar (Inicia CU-01.01.02) */}
                                    <Button variant="primary" type="submit" disabled={loading} className="px-4">
                                        Guardar Cambios
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>

            {/* --- MODAL CONFIRMACIÓN ACTUALIZAR (CU-01.01.02 Paso 4) --- */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Cambios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas guardar los cambios realizados en tu perfil?
                </Modal.Body>
                <Modal.Footer>
                    {/* Paso 4.2: Rechazar */}
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Rechazar
                    </Button>
                    {/* Paso 4.1: Aceptar */}
                    <Button variant="primary" onClick={confirmUpdate}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* --- MODAL CONFIRMACIÓN ELIMINAR (CU-01.01.03 Paso 2) --- */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered backdrop="static">
                <Modal.Header closeButton className="bg-danger text-white">
                    <Modal.Title>Eliminar Cuenta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>¡Esta acción es irreversible!</strong></p>
                    <p>¿Estás seguro de que deseas eliminar tu cuenta permanentemente? Perderás acceso a tus favoritos y citas.</p>
                </Modal.Body>
                <Modal.Footer>
                    {/* Paso 2.2: Rechazar */}
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Rechazar
                    </Button>
                    {/* Paso 2.1: Aceptar */}
                    <Button variant="danger" onClick={confirmDelete} disabled={loading}>
                        {loading ? 'Eliminando...' : 'Aceptar y Eliminar'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}