import { User, Client } from "@/types/User";

const API_URL = "http://localhost:3001";

export async function login(
  email: string,
  password: string
): Promise<User> {
  const res = await fetch(
    `${API_URL}/users?email=${email}&password=${password}`
  )

  if (!res.ok) {
    throw new Error("Error al conectar con el servidor")
  }

  const users: User[] = await res.json()

  if (users.length === 0) {
    throw new Error("Credenciales incorrectas")
  }

  return users[0]
}


export async function register_client(
  nombre_completo: string,
  correo: string,
  password: string,
  foto?: File
): Promise<Client> {
  const formData = new FormData();
  formData.append("nombre_completo", nombre_completo)
  formData.append("correo", correo)
  formData.append("password", password)
  if (foto) {
    formData.append("foto", foto)
  }

  const res = await fetch(`${API_URL}/clients`, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || "Error al registrar cliente")
  }

  const client: Client = await res.json()
  return client
}
