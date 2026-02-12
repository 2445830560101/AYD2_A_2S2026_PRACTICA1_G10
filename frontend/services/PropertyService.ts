import { API_URL, getHeaders } from './apiConfig'
import { Property } from "@/types/Property";

export async function fetch_properties(): Promise<Property[]> {
    const res = await fetch(`${API_URL}/propiedades/`, {
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