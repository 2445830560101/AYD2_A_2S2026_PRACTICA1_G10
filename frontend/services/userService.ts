import { API_URL, getHeaders, getFormHeaders } from './apiConfig'

export async function update_user(usere_id: number, nombre_completo: string, password: string, foto: string): Promise<void> {

    const formData = new FormData();
    formData.append("nombre_completo", nombre_completo)
    formData.append("usuario_id", usere_id.toString())
    formData.append("password", password)

    if (foto) {
        formData.append("foto", foto)
    }

    if (!nombre_completo && !password && !foto) {
        throw new Error("Al menos un campo debe ser actualizado")
    }

    const res = await fetch(`${API_URL}/usuarios/me`, {
        method: "POST",
        headers: getFormHeaders(),
        body: formData,
    })

    if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Error al registrar usere")
    }
}

export async function delete_user(usere_id: number): Promise<void> {

    const res = await fetch(`${API_URL}/usuarios/delete/${usere_id}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al eliminar el usere");
    }
}