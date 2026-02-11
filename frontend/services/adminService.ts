import { Agent, createAdmin, createAgent } from '@/types/User'

// Mock Data
let mockup_data = <Agent[]>[
    createAdmin({
        id: 1,
        nombre_completo: 'Juan Pérez',
        correo: 'juan@gmail.com',
        password: 'hashed_password'
    }),
    createAdmin({
        id: 2,
        nombre_completo: 'María Gómez',
        correo: 'mar@gmail.com',
        password: 'hashed_password'
    })
];

export async function get_agents(): Promise<Agent[]> {
    // TODO: Implementar carga de agentes desde backend
    return new Promise<Agent[]>((resolve) => setTimeout(() => resolve(mockup_data), 500));
};

export const create_agent = async (data: any) => {
    // Simula API POST /api/agents
    // CU-02.01.01 Excepción 2: Correo ya registrado
    if (mockup_data.find(a => a.correo === data.correo)) {
        throw new Error('Correo electrónico ya registrado');
    }
    const newAgent = createAgent({ id: Date.now(), ...data });
    mockup_data.push(newAgent);
    return newAgent;
};

export const update_agent = async (id: number, data: any) => {
    // Simula API PUT /api/agents/:id
    mockup_data = mockup_data.map(a => a.id === id ? { ...a, ...data } : a);
    return data;
};

export const delete_agent = async (id: number) => {
    // Simula API DELETE /api/agents/:id
    mockup_data = mockup_data.filter(a => a.id !== id);
    return true;
};