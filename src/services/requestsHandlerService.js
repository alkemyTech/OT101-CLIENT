//import axios
import axios from "axios"

//config object for axios to set the headers 
let config = {}

//if exist token in localStorage, then add it to headers 
function addToken(){
  if(localStorage.getItem("token")){
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  }
}

//handle get requests
/**
 * @param {string} url
 * @param {object} headers
 * @returns {Promise}
 * 
 * this function is used to handle get requests, receives the url and the headers,
 * if not headers are passed, then the headers object is setted to {}
 * if token exist in localStorage, then add it to headers
 */
export function getRequest(url, headers = {}) {
  config.headers = headers;
  addToken();
  let promise = new Promise((resolve, reject) => {
    axios.get(url, config)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      reject(error)
    })
  })

  return promise
}
//handle post requests
/**
 * @param {string} url
 * @param {object} data
 * @param {object} headers
 * @returns {Promise}
 * 
 * this function is used to handle post requests, receives the url, data and headers,
 * if not headers are passed, then the headers object is setted to {}
 * if token exist in localStorage, then add it to headers
 */
 export function postRequest(url, data ,headers = {}){
  let promise = new Promise((resolve, reject) => {
    config.headers = headers;
    addToken();
    axios.post(url, data, config)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      reject(error)
    })
  })

  return promise
}
//handle patch requests
/**
 * @param {string} url
 * @param {object} data
 * @param {object} headers
 * @returns {Promise}
 * 
 * this function is used to handle patch requests, receives the url, data and headers,
 * if not headers are passed, then the headers object is setted to {}
 * if token exist in localStorage, then add it to headers
 */
export function patchRequest(url, data ,headers = {}){
  let promise = new Promise((resolve, reject) => {
    config.headers = headers;
    addToken();
    axios.patch(url, data, config)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      reject(error)
    })
  })

  return promise
}

