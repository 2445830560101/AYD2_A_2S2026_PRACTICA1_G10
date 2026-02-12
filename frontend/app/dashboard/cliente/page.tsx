'use client';
import { useState, useEffect } from 'react';
import RoleSidebar from '@/components/RoleSidebar';
import PropertyCard from '@/components/cliente/PropertyCard';
import AppointmentModal from '@/components/cliente/AppointmentModal';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { Property } from '@/types/Property';
import { fetch_properties } from '@/services/PropertyService'
import { add_favorite, add_appointment } from '@/services/clientService';


export default function ClienteDashboard() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [search, setSearch] = useState('');
    const [selectedProp, setSelectedProp] = useState<Property | null>(null);

    const filtered = properties.filter(p => p.titulo.toLowerCase().includes(search.toLowerCase()));

    const addToFav = async (id: number) => {
        try {
            await add_favorite(id);
            alert('Favorito agregado correctamente');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al agregar favorito';
            alert(errorMessage);
        }
    }

    const agendarCita = async (dateTime: string) => {
        if (!selectedProp) return;
        
        try {
            await add_appointment(selectedProp.id, dateTime);
            alert(`Cita agendada exitosamente para ${selectedProp.titulo}`);
            setSelectedProp(null);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al agendar cita';
            alert(errorMessage);
        }
    }

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const initial_data: Property[] = await fetch_properties()
                setProperties(initial_data)
            } catch (error) {
                console.error('Error cargando citas:', error)
            }
        }
        fetchAppointments()
    }, [])

    return (
        <div className="d-flex">
            <RoleSidebar role="cliente" />
            <div className="flex-grow-1 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary fw-bold">Explorar Propiedades</h2>
                    <InputGroup style={{ maxWidth: '300px' }}>
                        <Form.Control placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} />
                        <Button variant="primary">Buscar</Button>
                    </InputGroup>
                </div>

                <Row xs={1} md={2} lg={3} className="g-4">
                    {filtered.map(prop => (
                        <Col key={prop.id}>
                            <PropertyCard
                                property={prop}
                            >
                                <Button variant="success" className="flex-grow-1 rounded-pill" onClick={() => addToFav(prop.id)}>
                                    Agregar a Favoritos
                                </Button>
                                <Button variant="primary" className="flex-grow-1 rounded-pill" onClick={() => setSelectedProp(prop)}>
                                    Agendar Cita
                                </Button>
                            </PropertyCard>
                        </Col>
                    ))}
                </Row>

                <AppointmentModal
                    show={!!selectedProp}
                    handleClose={() => setSelectedProp(null)}
                    property={selectedProp}
                    onConfirm={agendarCita}
                />
            </div>
        </div>
    );
}