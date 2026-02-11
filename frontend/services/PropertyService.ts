import { Property } from "@/types/Property";

const API_URL = "http://localhost:3001";

export async function fetch_properties(): Promise<Property[]> {
    // TODO: Implementar carga de propiedades desde backend
    const mockup_data: Property[] = [
        {
            id: 1,
            titulo: 'Casa Moderna Zona 10',
            direccion: 'Zona 10',
            precio: 250000,
            descripcion: 'Hermosa casa moderna con acabados de lujo',
            habitaciones: 3,
            banos: 2,
            metros_cuadrados: 250,
            fotos: ['https://placehold.co/600x400'],
            agente_id: 1,
            tipo: 'Casa'
        },
        {
            id: 2,
            titulo: 'Apartamento Céntrico',
            direccion: 'Zona 4',
            precio: 120000,
            descripcion: 'Apartamento céntrico, cercano a servicios',
            habitaciones: 2,
            banos: 1,
            metros_cuadrados: 95,
            fotos: ['https://placehold.co/600x400', 'https://placehold.co/600x500'],
            agente_id: 2,
            tipo: 'Apartamento'
        },
        {
            id: 3,
            titulo: 'Terreno Amplio',
            direccion: 'Carretera',
            precio: 85000,
            descripcion: 'Terreno ideal para desarrollo',
            habitaciones: null,
            banos: null,
            metros_cuadrados: 1200,
            fotos: ['https://placehold.co/600x400'],
            agente_id: 3,
            tipo: 'Terreno'
        }
    ]

    return mockup_data;
}

async function fetch_property_by_id(id: number): Promise<Property> {
    // TODO: Implementar carga de propiedad específica desde backend
    const properties = await fetch_properties()
    const prop = properties.find(p => p.id === id)
    if (!prop) throw new Error("Propiedad no encontrada")
    return prop
}
