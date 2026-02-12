export const ROLES = {
  ADMIN: 'admin',
  AGENTE: 'agente',
  CLIENTE: 'cliente'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];