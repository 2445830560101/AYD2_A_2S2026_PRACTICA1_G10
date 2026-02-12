'use client'

import { useState, useEffect } from 'react'
import RoleSidebar from '@/components/RoleSidebar'
import CitaCard from '@/components/agente/CitaCard'
import { Button, Card, Modal, Form, Alert, Tab, Tabs, Row, Col } from 'react-bootstrap'
import { get_appointment_requests, get_agent_scheduled_appointments, propose_appointment_date } from '@/services/agentService'
import { Appointment, ViewingStatus } from "@/types/Appointment"

export default function CitasAgentePagel() {
    const [solicitudes, setSolicitudes] = useState<Appointment[]>([])
    const [agendadas, setAgendadas] = useState<Appointment[]>([])
    const [rechazadas, setRechazadas] = useState<Appointment[]>([])

    // Estados para Modal de Propuesta
    const [showProposeModal, setShowProposeModal] = useState(false)
    const [selectedCita, setSelectedCita] = useState<Appointment | null>(null)
    const [propuestaFecha, setPropuestaFecha] = useState('')
    const [propuestaHora, setPropuestaHora] = useState('')

    // Estados para Filtros
    const [filtroFechaInicio, setFiltroFechaInicio] = useState('')
    const [filtroFechaFin, setFiltroFechaFin] = useState('')

    const [message, setMessage] = useState<{ type: 'success' | 'danger', text: string } | null>(null)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            const requests = await get_appointment_requests()
            const scheduled = await get_agent_scheduled_appointments()
            
            setSolicitudes(requests.filter(c => c.estado === ViewingStatus.PENDIENTE))
            setAgendadas(scheduled.filter(c => c.estado === ViewingStatus.CONFIRMADA))
            setRechazadas(scheduled.filter(c => c.estado === ViewingStatus.CANCELADA))
        } catch (error) {
            setMessage({ type: 'danger', text: 'Error al cargar citas' })
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleOpenProposeModal = (cita: Appointment) => {
        setSelectedCita(cita)
        setPropuestaFecha('')
        setPropuestaHora('')
        setShowProposeModal(true)
    }

    const handleProposeDatetime = async () => {
        if (!selectedCita || !propuestaFecha || !propuestaHora) {
            setMessage({ type: 'danger', text: 'Por favor completa todos los campos' })
            return
        }

        setLoading(true)
        try {
            const dateTimeString = `${propuestaFecha}T${propuestaHora}`
            await propose_appointment_date(selectedCita.id, dateTimeString)
            setMessage({ type: 'success', text: 'Fecha propuesta enviada al cliente' })
            setShowProposeModal(false)
            fetchData()
        } catch (error) {
            setMessage({ 
                type: 'danger', 
                text: error instanceof Error ? error.message : 'Error al proponer fecha' 
            })
        } finally {
            setLoading(false)
        }
    }

    // Función para filtrar citas por rango de fechas
    const filtrarCitasPorFecha = (citas: Appointment[]) => {
        return citas.filter(cita => {
            const fechaCita = new Date(cita.fecha_solicitada)
            
            if (filtroFechaInicio && new Date(filtroFechaInicio) > fechaCita) {
                return false
            }
            
            if (filtroFechaFin && new Date(filtroFechaFin) < fechaCita) {
                return false
            }
            
            return true
        })
    }

    const limpiarFiltros = () => {
        setFiltroFechaInicio('')
        setFiltroFechaFin('')
    }

    return (
        <div className="d-flex bg-light min-vh-100">
            <RoleSidebar role="agente" />
            <div className="flex-grow-1 p-4">
                <h2 className="text-primary fw-bold mb-4">Gestión de Citas</h2>

                {message && (
                    <Alert variant={message.type} onClose={() => setMessage(null)} dismissible className="mb-4">
                        {message.text}
                    </Alert>
                )}

                {/* Panel de Filtros */}
                <Card className="shadow-sm border-0 rounded-4 mb-4">
                    <Card.Body>
                        <h6 className="mb-3 text-primary"><i className="bi bi-funnel me-2"></i>Filtrar por Rango de Fechas</h6>
                        <Row className="g-2 align-items-end">
                            <Col xs={12} md={5}>
                                <Form.Group>
                                    <Form.Label className="small">Desde</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={filtroFechaInicio}
                                        onChange={(e) => setFiltroFechaInicio(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={5}>
                                <Form.Group>
                                    <Form.Label className="small">Hasta</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={filtroFechaFin}
                                        onChange={(e) => setFiltroFechaFin(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={2}>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    className="w-100"
                                    onClick={limpiarFiltros}
                                >
                                    <i className="bi bi-x-circle me-1"></i>
                                    Limpiar
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Tabs de Citas */}
                <Tabs defaultActiveKey="solicitudes" id="citas-tabs" className="mb-4">
                    
                    {/* TAB 1: SOLICITUDES PENDIENTES */}
                    <Tab eventKey="solicitudes" title={`⏱️ Solicitudes Pendientes (${filtrarCitasPorFecha(solicitudes).length})`}>
                        {filtrarCitasPorFecha(solicitudes).length === 0 ? (
                            <Card className="shadow-sm border-0 rounded-4 mt-3">
                                <Card.Body className="text-center py-5">
                                    <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                                    <p className="text-muted mt-3">No hay solicitudes de citas pendientes</p>
                                </Card.Body>
                            </Card>
                        ) : (
                            <Row className="mt-3 g-3">
                                {filtrarCitasPorFecha(solicitudes).map(cita => (
                                    <Col key={cita.id} xs={12} md={6} lg={4}>
                                        <CitaCard cita={cita}>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="w-100 mt-3"
                                                onClick={() => handleOpenProposeModal(cita)}
                                            >
                                                <i className="bi bi-calendar-event me-2"></i>
                                                Proponer Fecha
                                            </Button>
                                        </CitaCard>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Tab>

                    {/* TAB 2: CITAS AGENDADAS */}
                    <Tab eventKey="agendadas" title={`✅ Citas Confirmadas (${filtrarCitasPorFecha(agendadas).length})`}>
                        {filtrarCitasPorFecha(agendadas).length === 0 ? (
                            <Card className="shadow-sm border-0 rounded-4 mt-3">
                                <Card.Body className="text-center py-5">
                                    <i className="bi bi-calendar-check" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                                    <p className="text-muted mt-3">No hay citas agendadas aún</p>
                                </Card.Body>
                            </Card>
                        ) : (
                            <Row className="mt-3 g-3">
                                {filtrarCitasPorFecha(agendadas).map(cita => (
                                    <Col key={cita.id} xs={12} md={6} lg={4}>
                                        <CitaCard cita={cita}>
                                            <div className="alert alert-success py-2 px-2 mt-3 mb-0">
                                                <i className="bi bi-check-circle me-2"></i>
                                                <small><strong>Cita Confirmada</strong></small>
                                            </div>
                                        </CitaCard>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Tab>

                    {/* TAB 3: CITAS RECHAZADAS */}
                    <Tab eventKey="rechazadas" title={`❌ Rechazadas (${filtrarCitasPorFecha(rechazadas).length})`}>
                        {filtrarCitasPorFecha(rechazadas).length === 0 ? (
                            <Card className="shadow-sm border-0 rounded-4 mt-3">
                                <Card.Body className="text-center py-5">
                                    <i className="bi bi-x-circle" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                                    <p className="text-muted mt-3">No hay citas rechazadas</p>
                                </Card.Body>
                            </Card>
                        ) : (
                            <Row className="mt-3 g-3">
                                {filtrarCitasPorFecha(rechazadas).map(cita => (
                                    <Col key={cita.id} xs={12} md={6} lg={4}>
                                        <CitaCard cita={cita}>
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                className="w-100 mt-3"
                                                onClick={() => handleOpenProposeModal(cita)}
                                            >
                                                <i className="bi bi-arrow-repeat me-2"></i>
                                                Proponer Nuevo Horario
                                            </Button>
                                        </CitaCard>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Tab>
                </Tabs>

                {/* Modal Proponer Fecha */}
                <Modal show={showProposeModal} onHide={() => setShowProposeModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Proponer Fecha y Hora</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedCita && (
                            <>
                                <Card className="bg-light border-0 mb-3">
                                    <Card.Body>
                                        <p className="mb-2">
                                            <strong>Cliente:</strong> #{selectedCita.cliente_id}
                                        </p>
                                        <p className="mb-2">
                                            <strong>Propiedad:</strong> #{selectedCita.propiedad_id}
                                        </p>
                                        <p className="mb-0">
                                            <strong>Solicitado para:</strong>
                                            <br />
                                            <small>{new Date(selectedCita.fecha_solicitada).toLocaleString('es-ES')}</small>
                                        </p>
                                    </Card.Body>
                                </Card>
                                <hr />
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label><strong>Fecha Propuesta *</strong></Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={propuestaFecha}
                                            onChange={(e) => setPropuestaFecha(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label><strong>Hora Propuesta *</strong></Form.Label>
                                        <Form.Control
                                            type="time"
                                            value={propuestaHora}
                                            onChange={(e) => setPropuestaHora(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowProposeModal(false)}>
                            Cancelar
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={handleProposeDatetime}
                            disabled={loading}
                        >
                            {loading ? 'Enviando...' : 'Enviar Propuesta'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}
