export enum UserRole {
  ADMIN = "Administrador",
  AGENT = "Agente",
  CLIENT = "Cliente"
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
}
export interface Agent extends User {
}
export interface Admin extends User {
}

// Funciones factory
export const createClient = (data: Omit<Client, 'rol'>): Client => ({
  ...data,
  rol: UserRole.CLIENT
});

export const createAgent = (data: Omit<Agent, 'rol'>): Agent => ({
  ...data,
  rol: UserRole.AGENT
});

export const createAdmin = (data: Omit<Admin, 'rol'>): Admin => ({
  ...data,
  rol: UserRole.ADMIN
});