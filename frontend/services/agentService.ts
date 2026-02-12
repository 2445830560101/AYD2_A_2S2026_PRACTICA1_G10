import { API_URL, getHeaders, getFormHeaders } from './apiConfig'
import { Agent } from "@/types/User"
import { Appointment } from "@/types/Appointment"

export async function get_agents(): Promise<Agent[]> {
    const res = await fetch(`${API_URL}/agentes/`, {
        method: 'GET',
        headers: getHeaders(),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al conectar con el servidor");
    }

    const data: Agent[] = await res.json()
    return data
}

export async function get_agent_by_id(id: number): Promise<Agent | null> {
    const res = await fetch(`${API_URL}/agentes/${id}`, {
        method: 'GET',
        headers: getHeaders(),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al conectar con el servidor");
    }

    const data: Agent = await res.json()
    return data
}

// Citas del Agente

// Obtener solicitudes pendientes
export async function get_appointment_requests(): Promise<Appointment[]> {
    const res = await fetch(`${API_URL}/citas/solicitudes`, {
        method: 'GET',
        headers: getHeaders(),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al obtener solicitudes");
    }

    const data: Appointment[] = await res.json()
    return data
}

// Obtener citas agendadas/confirmadas
export async function get_agent_scheduled_appointments(): Promise<Appointment[]> {
    const res = await fetch(`${API_URL}/citas/agenda`, {
        method: 'GET',
        headers: getHeaders(),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al obtener agenda");
    }

    const data: Appointment[] = await res.json()
    return data
}

// Proponer nueva fecha para una cita
export async function propose_appointment_date(citaId: number, fechaPropuesta: string): Promise<Appointment> {
    const res = await fetch(`${API_URL}/citas/${citaId}/proponer`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
            fecha_propuesta: fechaPropuesta
        })
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al proponer fecha");
    }

    const data: Appointment = await res.json()
    return data
}

// Obtener detalle de una cita
export async function get_appointment_detail(citaId: number): Promise<Appointment> {
    const res = await fetch(`${API_URL}/citas/${citaId}`, {
        method: 'GET',
        headers: getHeaders(),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al obtener detalle de cita");
    }

    const data: Appointment = await res.json()
    return data
}
