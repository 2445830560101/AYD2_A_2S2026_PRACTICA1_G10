export interface UserAuth {
  id: number;
  nombre_completo: string;
  correo: string;
  rol: string;
  access_token: string;
  token_type: string;
  foto?: string;
}