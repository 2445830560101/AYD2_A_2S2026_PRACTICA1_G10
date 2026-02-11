import { Agent, createAgent } from "@/types/User"

let mockup_data = <Agent[]>[
    createAgent({
        id: 1,
        nombre_completo: 'Juan Pérez',
        correo: 'juan@gmail.com',
        password: 'hashed_password',
        foto: 'https://placehold.co/200x200'
    }),
    createAgent({
        id: 2,
        nombre_completo: 'María Gómez',
        correo: 'mar@gmail.com',
        password: 'hashed_password',
        foto: 'https://placehold.co/200x200'
    })
]

export async function get_agents(): Promise<Agent[]> {

    return new Promise<Agent[]>((resolve) => setTimeout(() => resolve(mockup_data), 500))
}

export async function get_agent_by_id(id: number): Promise<Agent | null> {
    const agent = mockup_data.find(a => a.id === id)
    return agent ? agent : null
}

export const create_agent = async (data: any) => {
    // TODO: Implementar creación de agente en backend
    const form = new FormData()
    form.append('nombre_completo', data.nombre_completo)
    form.append('email', data.correo)
    form.append('password', data.password)
    
    if (data.foto) {
        form.append('foto', data.foto)
    }

}