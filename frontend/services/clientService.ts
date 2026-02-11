import { User, Client, UserRole } from "@/types/User"
import { Appointment, ViewingStatus } from "@/types/Appointment"
import { Property } from "@/types/Property"

const API_URL = "http://localhost:3001";

// Favoritos

export async function get_favorites(user_id: number): Promise<Property[]> {
  // TODO: Implementar carga de favoritos desde backend

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
        }
    ]

    return mockup_data
}

export async function add_favorite(user_id: number, property_id: number): Promise<void> {
  // TODO: Implementar adición de favorito
}

export async function remove_favorite(user_id: number, property_id: number): Promise<void> {
  // TODO: Implementar eliminación de favorito
}


// Citas

export async function get_appointments(cliente_id: number): Promise<Appointment[]> {
  // TODO: Implementar carga de citas

    const mockup_data: Appointment[] = [
        {
            id: 1,
            cliente_id: cliente_id,
            agente_id: 10,
            propiedad_id: 101,
            fecha_solicitada: '2026-03-10T10:00:00',
            fecha_propuesta: null,
            estado: ViewingStatus.PENDIENTE,
            motivo_rechazo: null
        },
        {
            id: 2,
            cliente_id: cliente_id,
            agente_id: 11,
            propiedad_id: 102,
            fecha_solicitada: '2026-03-12T14:00:00',
            fecha_propuesta: '2026-03-12T16:00:00',
            estado: ViewingStatus.PROPUESTA_RECIBIDA,
            motivo_rechazo: null
        },
        {
            id: 3,
            cliente_id: cliente_id,
            agente_id: 12,
            propiedad_id: 103,
            fecha_solicitada: '2026-03-05T09:00:00',
            fecha_propuesta: null,
            estado: ViewingStatus.CONFIRMADA,
            motivo_rechazo: null
        },
        {
            id: 4,
            cliente_id: cliente_id,
            agente_id: 13,
            propiedad_id: 104,
            fecha_solicitada: '2026-03-08T11:00:00',
            fecha_propuesta: null,
            estado: ViewingStatus.RECHAZADA,
            motivo_rechazo: 'El agente no está disponible en esa fecha'
        },
        {
            id: 5,
            cliente_id: cliente_id,
            agente_id: 14,
            propiedad_id: 105,
            fecha_solicitada: '2026-03-15T15:00:00',
            fecha_propuesta: null,
            estado: ViewingStatus.CANCELADA,
            motivo_rechazo: null
        }
    ];

  return mockup_data;
}

export async function add_appointment(cliente_id: number, agente_id: number, propiedad_id: number, fecha_propuesta: string): Promise<void> {
  // TODO: Implementar creación de cita
}

export async function accept_appointment(appointment_id: number): Promise<void> {
    // TODO: Implementar aceptación de cita
}

export async function reject_appointment(appointment_id: number, reasong: string): Promise<void> {
    // TODO: Implementar rechazo de cita
    // Cambio a estado "cancelada"
}

// Perfil

export async function get_client_profile(cliente_id: number): Promise<Client> {
    // TODO: Implementar carga de perfil de cliente
    const mockup_data: Client = {
        id: cliente_id,
        nombre_completo: 'Juan Pérez',
        correo: 'juan@gmail.com',
        password: 'hashed_password',
        foto: 'https://placehold.co/200x200',
        rol: UserRole.CLIENT
    }

    return mockup_data;
}

export async function update_client(cliente_id: number, nombre_completo: string, password: string, foto: string): Promise<void> {
    // TODO: Implementar actualización de perfil de cliente
}

export async function delete_client(cliente_id: number): Promise<void> {
    //TODO: Implementar eliminación de perfil de cliente
}
