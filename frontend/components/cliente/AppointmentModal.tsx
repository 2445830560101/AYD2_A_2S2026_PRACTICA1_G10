'use client'

import { Modal, Form, Button } from 'react-bootstrap'
import { useState } from 'react'

export default function AppointmentModal({ show, handleClose, property }: any) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la llamada a la API
    alert(`Solicitud enviada para: ${property?.title} el ${date} a las ${time}`)
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Solicitar Visita</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <p>Propiedad: <strong>{property?.title}</strong></p>
          <Form.Group className="mb-3">
            <Form.Label>Fecha deseada</Form.Label>
            <Form.Control type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hora deseada</Form.Label>
            <Form.Control type="time" required value={time} onChange={(e) => setTime(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" type="submit">Confirmar Solicitud</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}