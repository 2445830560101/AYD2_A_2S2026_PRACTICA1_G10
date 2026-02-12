'use client'

import { Modal, Form, Button } from 'react-bootstrap'
import { useState } from 'react'

interface AppointmentModalProps {
    show: boolean;
    handleClose: () => void;
    property: any;
    onConfirm: (dateTime: string) => void;
}

export default function AppointmentModal({ show, handleClose, property, onConfirm }: AppointmentModalProps) {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dateTimeString = `${date}T${time}`;
        onConfirm(dateTimeString);
        setDate('');
        setTime('');
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Solicitar Visita</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <p>Propiedad: <strong>{property?.titulo}</strong></p>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha deseada</Form.Label>
                        <Form.Control 
                            type="date" 
                            required 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Hora deseada</Form.Label>
                        <Form.Control 
                            type="time" 
                            required 
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
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