import * as httpService from "../services/requestsHandlerService"

export async function login(data) {
	const { firstName, lastName, email, token } = await httpService.postRequest(
		'http://localhost:3000/auth/login', data
	)

	localStorage.setItem("token", token)

	return { firstName, lastName, email }
}

export async function register(data) {
	const response = await httpService.postRequest('http://localhost:3000/auth/register', data)

	if (response.errors) return response

	const { firstName, lastName, email, token } = response

	localStorage.setItem("token", token)

	return { firstName, lastName, email }
}

export async function verifyToken() {
	if (localStorage.getItem("token")) {
		//Enviar token y obtener la data correspondiente al usuario, siempre y cuando el token sea válido
		try {
			const { firstName, lastName, email, token } =
				await httpService.getRequest("http://localhost:3000/auth/me")
			localStorage.setItem("token", token)

			return { firstName, lastName, email }
		} catch (err) {
			if (err.response.status === 401) localStorage.clear("token")
			throw err
			
		}
	} else throw new Error('Token not found')
}

export function logout() {
	localStorage.clear("token")
}

export async function editProfile(id, data) {
  return httpService.patchRequest(`localhost:3000/users/${id}`, data);

}

export async function deleteAccount(id) {
  return httpService.deleteRequest(`localhost:3000/users/${id}`);
}