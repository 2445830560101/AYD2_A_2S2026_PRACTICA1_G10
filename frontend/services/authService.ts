import { User, Client } from "@/types/User";
import { API_URL, getHeaders, getFormHeaders } from './apiConfig'
import { UserAuth } from "@/types/Auth";

export async function login(
	email: string,
	password: string
): Promise<UserAuth> {
	const res = await fetch(`${API_URL}/auth/login`, {
		method: 'POST',
		headers: getHeaders(),
		body: JSON.stringify({
			correo: email,
			password: password
		}),
	});

	if (!res.ok) {
		const errorData = await res.json().catch(() => ({}));

		if (res.status === 401) {
			throw new Error(errorData.detail || "Credenciales incorrectas");
		}
		throw new Error("Error al conectar con el servidor");
	}

	const data: UserAuth = await res.json()
	return data
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

	if (!nombre_completo || !correo || !password) {
		throw new Error("Todos los campos son obligatorios")
	}

	const res = await fetch(`${API_URL}/usuarios/registro`, {
		method: "POST",
		headers: getFormHeaders(),
		body: formData,
	})

	if (!res.ok) {
		const errorData = await res.json()
		throw new Error(errorData.message || "Error al registrar cliente")
	}

	const client: Client = await res.json()
	return client
}
