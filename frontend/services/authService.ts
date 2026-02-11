import { User } from "@/types/User";

const API_URL = "http://localhost:3001";

export async function login(
  email: string,
  password: string
): Promise<User> {
  const res = await fetch(
    `${API_URL}/users?email=${email}&password=${password}`
  );

  if (!res.ok) {
    throw new Error("Error al conectar con el servidor");
  }

  const users: User[] = await res.json();

  if (users.length === 0) {
    throw new Error("Credenciales incorrectas");
  }

  return users[0];
}
