import * as httpService from '../services/requestsHandlerService';

export async function login(data) {
  const { firstName, lastName, email, token } = await httpService.postRequest('TODO ADD ENDPOINT', data);

  localStorage.setItem('token', token);

  return { firstName, lastName, email };
}

export function register(data) {
  return httpService.postRequest('TODO ADD ENDPOINT', data);
}

export async function verifyToken() {
  if (localStorage.getItem('token')) {
    //Enviar token y obtener la data correspondiente al usuario, siempre y cuando el token sea válido
    try {
      const { firstName, lastName, email, token } = await httpService.getRequest('TODO ADD ENDPOINT');
      localStorage.setItem('token', token);
  
      return { firstName, lastName, email };
    } catch (err) {
      if (err.response.status === 401) 
        localStorage.clear('token')     
      throw err;
    }
  }
}

export function logout() {
  localStorage.clear('token');
}

export async function editProfile(id, data) {
  return httpService.patchRequest(`localhost:3000/users/${id}`, data);

}

export async function deleteAccount(id) {
  return httpService.deleteRequest(`localhost:3000/users/${id}`);
}