//import axios
import axios from 'axios';

//config object for axios to set the headers
const config = {};
const API_URL = process.env.REACT_APP_API_URL; 

//if exist token in localStorage, then add it to headers
function addToken() {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
}

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
export function getRequest(endpoint, headers = {}) {
  config.headers = headers;
  addToken();
  return axios.get(`${API_URL}${endpoint}`, config).then((response) => response.data);
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
  config.headers = headers;
  addToken();
  return axios.post(`${API_URL}${endpoint}`, data, config).then((response) => response.data);
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
  config.headers = headers;
  addToken();
  return axios.patch(`${API_URL}${endpoint}`, data, config).then((response) => response.data);
}

/**
 * @param {string} endpoint
 * @param {object} headers
 * @returns {Promise}
 */
export function deleteRequest(endpoint, headers = {}) {
  config.headers = headers;
  addToken();
  return axios.delete(`${API_URL}${endpoint}`, config).then((response) => response.data);
}
