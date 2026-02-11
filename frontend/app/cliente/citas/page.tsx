'use client'

import { useState, useEffect } from 'react'
import RoleSidebar from '@/components/RoleSidebar'
import { Table, Badge, Button, Card, Modal, Form } from 'react-bootstrap' // 1. Agregamos Modal y Form
import { get_appointments, accept_appointment, reject_appointment } from '@/services/clientService'
import { Appointment, ViewingStatus } from "@/types/Appointment"
import { useAuth } from '@/context/AuthContext' // Asumimos que usas el contexto para el ID

export default function MisCitasPage() {
    const { user } = useAuth()
    const [citas, setCitas] = useState<Appointment[]>([])

    // 2. Estados para el Modal de Rechazo
    const [showRejectModal, setShowRejectModal] = useState(false)
    const [selectedCitaId, setSelectedCitaId] = useState<number | null>(null)
    const [rejectReason, setRejectReason] = useState('')

    // Cargar citas
    const fetchAppointments = async () => {
        // if (!user) return
        try {
            // Usamos el ID real del usuario en lugar de '1'
            const initial_data: Appointment[] = await get_appointments(user?.id ?? 0)
            setCitas(initial_data)
        } catch (error) {
            console.error('Error cargando citas:', error)
        }
    }

    useEffect(() => {
        fetchAppointments()
    }, [user])

    // 3. Manejadores de Acciones
    const handleAccept = async (id: number) => {
        try {
            await accept_appointment(id)
            fetchAppointments() // Refrescar tabla
        } catch (error) {
            alert('Error al aceptar la cita')
        }
    }

    const handleOpenReject = (id: number) => {
        setSelectedCitaId(id)
        setRejectReason('')
        setShowRejectModal(true)
    }

    const handleConfirmReject = async () => {
        if (!selectedCitaId) return

        try {
            // Se asume que tu servicio acepta (id, motivo)
            await reject_appointment(selectedCitaId, rejectReason)
            setShowRejectModal(false)
            fetchAppointments()
        } catch (error) {
            alert('Error al rechazar la cita')
        }
    }

    const getBadge = (status: string) => {
        switch (status) {
            case ViewingStatus.CONFIRMADA: return 'success'
            case ViewingStatus.PENDIENTE: return 'warning'
            case ViewingStatus.RECHAZADA: return 'danger'
            case ViewingStatus.PROPUESTA_RECIBIDA: return 'info'
            default: return 'secondary'
        }
    }

    return (
        <div className="d-flex bg-light min-vh-100">
            <RoleSidebar role="cliente" />
            <div className="flex-grow-1 p-4">
                <h2 className="text-primary fw-bold mb-4">Gestión de Citas</h2>

                <Card className="shadow-sm border-0 rounded-4">
                    <Card.Body>
                        <Table responsive hover className="align-middle">
                            <thead className="bg-light">
                                <tr>
                                    <th>Propiedad</th>
                                    <th>Fecha Solicitada</th>
                                    <th>Fecha Propuesta</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {citas.map(cita => (
                                    <tr key={cita.id}>
                                        <td className="fw-bold">{cita.propiedad_id}</td>
                                        <td>{cita.fecha_solicitada}</td>
                                        <td>{cita.fecha_propuesta || '-'}</td>
                                        <td>
                                            <Badge bg={getBadge(cita.estado)}>{cita.estado.replace('_', ' ')}</Badge>
                                        </td>
                                        <td>
                                            {cita.estado === ViewingStatus.PROPUESTA_RECIBIDA ? (
                                                <div className="d-flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="success"
                                                        onClick={() => handleAccept(cita.id)}
                                                    >
                                                        Aceptar
                                                    </Button>
                                                    {/* 4. Botón abre el Modal */}
                                                    <Button
                                                        size="sm"
                                                        variant="danger"
                                                        onClick={() => handleOpenReject(cita.id)}
                                                    >
                                                        Rechazar
                                                    </Button>
                                                </div>
                                            ) : (
                                                <span className="text-muted small">Sin acciones</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                {/* 5. Modal de Rechazo (CU-05.01.03) */}
                <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Rechazar Propuesta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Por favor, indique el motivo del rechazo:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="Ej. El horario no me conviene..."
                                    required
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
                            Cancelar
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleConfirmReject}
                            disabled={!rejectReason.trim()} // Deshabilitar si está vacío
                        >
                            Confirmar Rechazo
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}