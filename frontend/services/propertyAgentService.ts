import { API_URL, getHeaders, getFormHeaders } from './apiConfig'
import { Property } from "@/types/Property"

// Obtener propiedades del agente
export async function get_agent_properties(): Promise<Property[]> {
    const res = await fetch(`${API_URL}/propiedades/mis_propiedades`, {
        method: 'GET',
        headers: getHeaders(),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al obtener propiedades");
    }

    const data: Property[] = await res.json()
    return data
}

// Crear propiedad
export async function create_property(propertyData: {
    titulo: string;
    descripcion: string;
    direccion: string;
    precio: number;
    habitaciones: number;
    banos: number;
    metros_cuadrados: number;
    tipo_id: number;
}): Promise<Property> {
    const res = await fetch(`${API_URL}/propiedades/registro_propiedad`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(propertyData)
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al crear la propiedad");
    }

    const data: Property = await res.json()
    return data
}

// Actualizar propiedad
export async function update_property(propertyId: number, propertyData: {
    titulo?: string;
    descripcion?: string;
    direccion?: string;
    precio?: number;
    habitaciones?: number;
    banos?: number;
    metros_cuadrados?: number;
    tipo_id?: number;
}): Promise<Property> {
    const res = await fetch(`${API_URL}/propiedades/${propertyId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(propertyData)
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al actualizar la propiedad");
    }

    const data: Property = await res.json()
    return data
}

// Eliminar propiedad
export async function delete_property(propertyId: number): Promise<void> {
    const res = await fetch(`${API_URL}/propiedades/${propertyId}`, {
        method: 'DELETE',
        headers: getHeaders(),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al eliminar la propiedad");
    }
}

// Tipos de inmuebles
export async function get_property_types(): Promise<{ id: number; nombre: string }[]> {
    const res = await fetch(`${API_URL}/tipos-inmuebles/`, {
        method: 'GET',
        headers: getHeaders(),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al obtener tipos de inmuebles");
    }

    const data: { id: number; nombre: string }[] = await res.json()
    return data
}

// Crear tipo de inmueble
export async function create_property_type(nombre: string): Promise<{ id: number; nombre: string }> {
    const res = await fetch(`${API_URL}/tipos-inmuebles/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ nombre })
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al crear tipo de inmueble");
    }

    const data: { id: number; nombre: string } = await res.json()
    return data
}
