'use client'

import { useState } from 'react'
import { Form, Button, Container, Alert, Card } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { login as loginService } from '@/services/authService'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const user = await loginService(email, password)
      login(user) // Guarda usuario en contexto global
      
      // TODO: evaluar user.role para saber a donde redirigir (admin, agente, cliente)
      router.push('/dashboard');
    } catch (err: any) {
      // Manejo de errores según CU-03.01.02 (Excepciones 2.1 y 2.2)
      const message = err.message || 'Datos ingresados incorrectos'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container fluid className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '100vh' }}>
      <Card style={{ maxWidth: '450px', width: '100%' }} className="shadow-lg border-0 rounded-4 my-5">
        <Card.Body className="p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Bienvenido</h2>
            <p className="text-muted">Ingresa tus credenciales para continuar</p>
          </div>

          {/* Área de errores (CU-03.01.02 Excepciones) */}
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Correo Electrónico</label>
            </Form.Floating>

            <Form.Floating className="mb-4">
              <Form.Control
                id="password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Contraseña</label>
            </Form.Floating>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-2 rounded-pill fw-bold shadow-sm" 
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>

            <div className="text-center mt-4">
              <span className="text-muted">¿No tienes cuenta? </span>
              <Link href="/register/cliente" className="text-decoration-none fw-bold">
                Regístrate aquí
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}