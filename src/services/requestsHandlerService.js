import axios from 'axios';


const httpRequest = (verb, endpoint, data, headers) => {
  const config = {
    headers: headers || {}
  };

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.method = verb;
  config.url = process.env.REACT_APP_API_URL + endpoint;
  if (data) {
    config.data = data;
  }
console.log(config)
  return new Promise((resolve, reject) => {
    axios(config)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
  });
};


//handle get requests
/**
 * @param {string} endpoint
 * @param {object} headers
 * @returns {Promise}
 *
 * this function is used to handle get requests, receives the endpoint and the headers,
 * if not headers are passed, then the headers object is setted to {}
 * if token exist in localStorage, then add it to headers
 */
export function getRequest(endpoint, headers) {
  return httpRequest('get', endpoint, null, headers);
}

//handle post requests
/**
 * @param {string} endpoint
 * @param {object} data
 * @param {object} headers
 * @returns {Promise}
 *
 * this function is used to handle post requests, receives the endpoint, data and headers,
 * if not headers are passed, then the headers object is setted to {}
 * if token exist in localStorage, then add it to headers
 */
export function postRequest(endpoint, data, headers = {}) {
  return httpRequest('post', endpoint, data, headers);
}

//handle patch requests
/**
 * @param {string} endpoint
 * @param {object} data
 * @param {object} headers
 * @returns {Promise}
 *
 * this function is used to handle patch requests, receives the endpoint, data and headers,
 * if not headers are passed, then the headers object is setted to {}
 * if token exist in localStorage, then add it to headers
 */
export function patchRequest(endpoint, data, headers = {}) {
  return httpRequest('patch', endpoint, data, headers);}

/**
 * @param {string} endpoint
 * @param {object} headers
 * @returns {Promise}
 */
export function deleteRequest(endpoint, headers = {}) {
  return httpRequest('post', endpoint, null, headers);
}
