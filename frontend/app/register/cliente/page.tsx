'use client';

import { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Card, Image } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { register_user } from '@/services/authService';
import { Client } from "@/types/User";

export default function RegisterClientPage() {
    const router = useRouter()
    
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    // Estado para la URL de previsualización
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [photo, setPhoto] = useState<File | null>(null)

    const [formData, setFormData] = useState<Client>({
        nombre_completo: '',
        correo: '',
        password: '',
        foto: undefined,
    } as Client)

    // Manejador específico para la imagen
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setPhoto(file)
            // Crear URL temporal para previsualización
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
        }
    };

    // Limpiar memoria de la imagen temporal al desmontar
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        }
    }, [previewUrl])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            await register_user(
                'Cliente',
                formData.nombre_completo,
                formData.correo,
                formData.password,
                photo || undefined
            );
            router.push('/')
        } catch (err: any) {
            setError(err.message || 'Error al registrar cliente')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container fluid className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '100vh' }}>
            <Card style={{ maxWidth: '500px', width: '100%' }} className="shadow-lg border-0 rounded-4 my-5">
                <Card.Body className="p-5">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-primary">Crear Cuenta</h2>
                        <p className="text-muted">Únete a HomeFinder Pro</p>
                    </div>
                    
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        {/* Sección de Foto de Perfil */}
                        <div className="d-flex flex-column align-items-center mb-4">
                            <div 
                                className="position-relative overflow-hidden rounded-circle mb-3 border border-3 border-light shadow-sm"
                                style={{ width: '120px', height: '120px', backgroundColor: '#e9ecef' }}
                            >
                                {previewUrl ? (
                                    <Image 
                                        src={previewUrl} 
                                        alt="Previsualización" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    />
                                ) : (
                                    <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                                        {/* Icono SVG por defecto */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <Form.Group controlId="formFile" className="w-100 text-center">
                                <Form.Label className="btn btn-outline-secondary btn-sm rounded-pill px-4">
                                    {previewUrl ? 'Cambiar Foto' : 'Subir Foto'}
                                    <Form.Control 
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }} 
                                    />
                                </Form.Label>
                                <Form.Text className="d-block text-muted" style={{fontSize: '0.8rem'}}>
                                    (Opcional)
                                </Form.Text>
                            </Form.Group>
                        </div>

                        {/* Campos del Formulario con Floating Labels */}
                        <Form.Floating className="mb-3">
                            <Form.Control 
                                id="nombre"
                                type="text" 
                                required 
                                placeholder="Nombre Completo"
                                value={formData.nombre_completo}
                                onChange={(e) => setFormData({...formData, nombre_completo: e.target.value})}
                            />
                            <label htmlFor="nombre">Nombre Completo</label>
                        </Form.Floating>

                        <Form.Floating className="mb-3">
                            <Form.Control 
                                id="correo"
                                type="email" 
                                required 
                                placeholder="nombre@ejemplo.com"
                                value={formData.correo}
                                onChange={(e) => setFormData({...formData, correo: e.target.value})}
                            />
                            <label htmlFor="correo">Correo Electrónico</label>
                        </Form.Floating>

                        <Form.Floating className="mb-4">
                            <Form.Control 
                                id="password"
                                type="password" 
                                required 
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                            <label htmlFor="password">Contraseña</label>
                        </Form.Floating>

                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="w-100 py-2 rounded-pill fw-bold shadow-sm" 
                            disabled={loading}
                        >
                            {loading ? 'Registrando...' : 'Registrarme'}
                        </Button>

                        <div className="text-center mt-4">
                            <span className="text-muted">¿Ya tienes cuenta? </span>
                            <a href="/" className="text-decoration-none fw-bold">Inicia Sesión</a>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}