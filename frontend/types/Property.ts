
export interface Property {
    id: number;
    titulo: string;
    direccion: string;
    precio: number;
    descripcion: string | null;
    habitaciones: number | null;
    banos: number | null;
    metros_cuadrados: number | null;
    fotos: string[];
    agente_id: number;
    tipo: string;
}