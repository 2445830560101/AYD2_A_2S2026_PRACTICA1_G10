import { Appointment, ViewingStatus } from '@/types/Appointment'
import { Badge, Card } from 'react-bootstrap'

interface CitaCardProps {
    cita: Appointment
    children?: React.ReactNode
}

export default function CitaCard({ cita, children }: CitaCardProps) {
    const getBadgeColor = (status: string) => {
        switch (status) {
            case ViewingStatus.PENDIENTE: return 'warning'
            case ViewingStatus.ENVIADA: return 'info'
            case ViewingStatus.CONFIRMADA: return 'success'
            case ViewingStatus.CANCELADA: return 'danger'
            default: return 'secondary'
        }
    }

    return (
        <Card className="shadow-sm border-0 rounded-3 h-100">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h6 className="text-muted mb-1">Cliente #{cita.cliente_id}</h6>
                        <Badge bg={getBadgeColor(cita.estado)}>{cita.estado}</Badge>
                    </div>
                </div>

                <div className="mb-3">
                    <p className="mb-2">
                        <strong>Propiedad:</strong> #{cita.propiedad_id}
                    </p>
                    <p className="mb-2">
                        <strong>Fecha Solicitada:</strong>
                        <br />
                        {new Date(cita.fecha_solicitada).toLocaleString('es-ES')}
                    </p>
                    {cita.fecha_propuesta && (
                        <p className="mb-2">
                            <strong>Fecha Propuesta:</strong>
                            <br />
                            {new Date(cita.fecha_propuesta).toLocaleString('es-ES')}
                        </p>
                    )}
                    {cita.motivo_rechazo && cita.estado == ViewingStatus.CANCELADA &&(
                        <p className="mb-2 text-danger">
                            <strong>Motivo Rechazo:</strong>
                            <br />
                            {cita.motivo_rechazo}
                        </p>
                    )}
                </div>

                {children}
            </Card.Body>
        </Card>
    )
}
