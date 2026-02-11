'use client';

import { useState } from 'react';
import { Card, Badge, Button, Carousel, Modal, Row, Col } from 'react-bootstrap';
// Asegúrate de que la ruta de importación sea correcta según tu estructura
import { Property } from '@/types/Property';

interface Props {
    property: Property;
    children?: React.ReactNode;
}

export default function PropertyCard({ property, children }: Props) {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // Helper para renderizar el carrusel (se usa tanto en la card como en el modal)
    const renderCarousel = (height: string) => {
        if (Array.isArray(property.fotos) && property.fotos.length > 0) {
            return (
                <Carousel
                    indicators={property.fotos.length > 1}
                    controls={property.fotos.length > 1}
                    className="overflow-hidden rounded"
                    variant="dark"
                    interval={null} // Evita que cambie solo si no se desea
                >
                    {property.fotos.map((src: string, i: number) => (
                        <Carousel.Item key={i}>
                            <img
                                src={src}
                                alt={`foto-${i}`}
                                style={{ width: '100%', height: height, objectFit: 'cover' }}
                                className="d-block w-100"
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            );
        } else {
            return (
                <img
                    src={'/placeholder.webp'}
                    alt="Propiedad"
                    style={{ width: '100%', height: height, objectFit: 'cover' }}
                    className="d-block w-100 rounded"
                />
            );
        }
    };

    return (
        <>
            <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                <div className="position-relative">
                    {renderCarousel('200px')}

                    {property.tipo && (
                        <Badge bg="info" className="position-absolute top-0 start-0 m-3 shadow-sm">
                            {property.tipo}
                        </Badge>
                    )}
                </div>

                <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title className="fw-bold mb-0 text-truncate" title={property.titulo}>
                            {property.titulo}
                        </Card.Title>
                        <h5 className="text-success fw-bold">${property.precio.toLocaleString()}</h5>
                    </div>

                    <Card.Text className="text-muted small mb-3">
                        <i className="bi bi-geo-alt-fill me-1"></i> {property.direccion}
                    </Card.Text>

                    <div className="d-flex gap-3 small text-muted mb-3">
                        {property.habitaciones && (
                            <span><i className="bi bi-door-closed me-1"></i>{property.habitaciones} Hab.</span>
                        )}
                        {property.banos && (
                            <span><i className="bi bi-droplet me-1"></i>{property.banos} Baños</span>
                        )}
                        {property.metros_cuadrados && (
                            <span><i className="bi bi-bounding-box-circles me-1"></i>{property.metros_cuadrados} m²</span>
                        )}
                    </div>

                    <Button variant="outline-primary" size="sm" className="w-100" onClick={handleShow}>
                        Ver detalles completos
                    </Button>
                </Card.Body>

                <Card.Footer className="bg-white border-0 pt-0 pb-3 d-flex gap-2">
                    {children}
                </Card.Footer>
            </Card>

            <Modal show={showModal} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">{property.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-4">
                        {renderCarousel('400px')}
                    </div>

                    <Row className="mb-4">
                        <Col md={6}>
                            <Card className="bg-light border-0">
                                <Card.Body>
                                    <h6 className="fw-bold mb-3">Detalles</h6>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-2 d-flex justify-content-between">
                                            <strong>Precio:</strong>
                                            <span className="text-success fw-bold">${property.precio.toLocaleString()}</span>
                                        </li>
                                        <li className="mb-2 d-flex justify-content-between">
                                            <strong>Tipo:</strong> <span>{property.tipo}</span>
                                        </li>
                                        <li className="mb-2 d-flex justify-content-between">
                                            <strong>Habitaciones:</strong> <span>{property.habitaciones ?? 'N/A'}</span>
                                        </li>
                                        <li className="mb-2 d-flex justify-content-between">
                                            <strong>Baños:</strong> <span>{property.banos ?? 'N/A'}</span>
                                        </li>
                                        <li className="mb-2 d-flex justify-content-between">
                                            <strong>Área:</strong> <span>{property.metros_cuadrados ? `${property.metros_cuadrados} m²` : 'N/A'}</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <strong>Ubicación:</strong> <span className="text-end" style={{ maxWidth: '150px' }}>{property.direccion}</span>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <h5 className="fw-bold text-primary">Descripción</h5>
                            <p className="text-muted">
                                {property.descripcion || "No hay descripción disponible para esta propiedad."}
                            </p>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}