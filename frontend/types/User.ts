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
  foto?: string
}

// Cliente basado en User
export interface Client extends User {
  foto?: string; // URL de la foto del cliente
  rol: UserRole.CLIENT; // Asegura que el rol sea siempre "cliente"
}

// Agente basado en User
export interface Agent extends User {
  rol: UserRole.AGENT; // Asegura que el rol sea siempre "agente"
}

// Admin basado en User
export interface Admin extends User {
  rol: UserRole.ADMIN; // Asegura que el rol sea siempre "admin"
}