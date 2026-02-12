import { API_URL, getHeaders, getFormHeaders } from './apiConfig'
import { Client, createClient } from "@/types/User"
import { Appointment, ViewingStatus } from "@/types/Appointment"
import { Property } from "@/types/Property"

export async function get_clients(): Promise<Client[]> {

    const res = await fetch(`${API_URL}/clientes/`, {
        method: 'GET',
        headers: getHeaders(),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al conectar con el servidor");
    }

    const data: Client[] = await res.json()
    return data
}

// Favoritos
export async function get_favorites(): Promise<Property[]> {
    const res = await fetch(`${API_URL}/clientes/favoritos`, {
        method: 'GET',
        headers: getHeaders(),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al conectar con el servidor");
    }

    const data: Property[] = await res.json()
    return data
}

export async function add_favorite(property_id: number): Promise<void> {
    const res = await fetch(`${API_URL}/clientes/favoritos/${property_id}`, {
        method: 'POST',
        headers: getHeaders(),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al conectar con el servidor");
    }
}

export async function remove_favorite(property_id: number): Promise<void> {
    const res = await fetch(`${API_URL}/clientes/favoritos/${property_id}`, {
        method: 'DELETE',
        headers: getHeaders(),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al conectar con el servidor");
    }
}


// Citas

export async function get_appointments(): Promise<Appointment[]> {
    const res = await fetch(`${API_URL}/citas/mis-citas`, {
        method: 'GET',
        headers: getHeaders(),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al obtener citas");
    }

    const data: Appointment[] = await res.json()
    return data
}

export async function add_appointment(propiedad_id: number, fecha_solicitada: string): Promise<Appointment> {
    const res = await fetch(`${API_URL}/citas/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            propiedad_id,
            fecha_solicitada
        })
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al crear la cita");
    }

    const data: Appointment = await res.json()
    return data
}

export async function accept_appointment(appointment_id: number): Promise<Appointment> {
    const res = await fetch(`${API_URL}/citas/${appointment_id}/aceptar`, {
        method: 'PUT',
        headers: getHeaders(),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al aceptar la cita");
    }

    const data: Appointment = await res.json()
    return data
}

export async function reject_appointment(appointment_id: number, reason: string): Promise<Appointment> {
    const res = await fetch(`${API_URL}/citas/${appointment_id}/rechazar`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
            motivo_rechazo: reason
        })
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al rechazar la cita");
    }

    const data: Appointment = await res.json()
    return data
}