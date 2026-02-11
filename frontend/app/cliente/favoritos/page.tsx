'use client';
import { useState, useEffect } from 'react';
import RoleSidebar from '@/components/RoleSidebar';
import PropertyCard from '@/components/cliente/PropertyCard';
import AppointmentModal from '@/components/cliente/AppointmentModal';
import { Row, Col, Alert } from 'react-bootstrap'
import { get_favorites, remove_favorite } from '@/services/clientService';
import { useAuth } from '@/context/AuthContext';
import { Property } from '@/types/Property';
import { Button } from 'react-bootstrap';

export default function FavoritosPage() {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<Property[]>([]);
    const [selectedProp, setSelectedProp] = useState(null);

    const removeFav = (id: number) => {
        // Lógica optimista de UI
        remove_favorite(user?.id ?? 0, id)
        setFavorites(prev => prev.filter(p => p.id !== id))
        alert(`Favorito eliminado`);
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const initial_data: Property[] = await get_favorites(user?.id ?? 0)
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
                                    <Button variant="primary" className="flex-grow-1 rounded-pill" onClick={(p: any) => setSelectedProp(p)}>
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
                />
            </div>
        </div>
    );
}