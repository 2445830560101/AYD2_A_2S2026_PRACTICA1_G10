export enum UserRole {
  ADMIN = "admin",
  AGENT = "agente",
  CLIENT = "cliente"
}

export interface User {
  id: number
  nombre_completo: string
  correo: string
  rol: UserRole
  password: string
}

// Cliente basado en User
export interface Client extends User {
  foto?: string; // URL de la foto del cliente
  rol: UserRole.CLIENT; // Asegura que el rol sea siempre "cliente"
}