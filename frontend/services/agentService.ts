import { API_URL, getHeaders, getFormHeaders } from './apiConfig'
import { Agent } from "@/types/User"


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
