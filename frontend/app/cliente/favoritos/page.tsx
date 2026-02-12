'use client';
import { useState, useEffect } from 'react';
import RoleSidebar from '@/components/RoleSidebar';
import PropertyCard from '@/components/cliente/PropertyCard';
import AppointmentModal from '@/components/cliente/AppointmentModal';
import { Row, Col, Alert } from 'react-bootstrap'
import { get_favorites, remove_favorite, add_appointment } from '@/services/clientService';
import { Property } from '@/types/Property';
import { Button } from 'react-bootstrap';

export default function FavoritosPage() {
    const [favorites, setFavorites] = useState<Property[]>([]);
    const [selectedProp, setSelectedProp] = useState<Property | null>(null);

    const removeFav = async (id: number) => {
        try {
            await remove_favorite(id)
            setFavorites(prev => prev.filter(p => p.id !== id))
            alert('Favorito eliminado correctamente');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al eliminar favorito';
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
        const fetchFavorites = async () => {
            try {
                const initial_data: Property[] = await get_favorites()
                setFavorites(initial_data)
            } catch (error) {
                console.error('Error cargando citas:', error)
            }
        }
        fetchFavorites()
    }, [])

    return (
        <div className="d-flex bg-light min-vh-100">
            <RoleSidebar role="cliente" />
            <div className="flex-grow-1 p-4">
                <h2 className="text-danger fw-bold mb-4">Mis Favoritos</h2>

                {favorites.length === 0 ? (
                    <Alert variant="warning">No tienes propiedades marcadas como favoritas aún.</Alert>
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {favorites.map(prop => (
                            <Col key={prop.id}>
                                <PropertyCard
                                    property={prop}
                                >
                                    <Button variant="danger" className="flex-grow-1 rounded-pill" onClick={() => removeFav(prop.id)}>
                                        Remover de Favoritos
                                    </Button>
                                    <Button variant="primary" className="flex-grow-1 rounded-pill" onClick={() => setSelectedProp(prop)}>
                                        Agendar Cita
                                    </Button>
                                </PropertyCard>
                            </Col>
                        ))}
                    </Row>
                )}

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