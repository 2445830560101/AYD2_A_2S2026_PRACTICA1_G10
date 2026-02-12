export enum ViewingStatus {
    PENDIENTE = 'pendiente',
    ENVIADA = 'enviada',
    CONFIRMADA = 'confirmada',
    CANCELADA = 'cancelada'
}

export interface Appointment {
    id: number

    cliente_id: number
    agente_id: number
    propiedad_id: number

    fecha_solicitada: string
    fecha_propuesta: string | null
    estado: ViewingStatus
    motivo_rechazo: string | null
}