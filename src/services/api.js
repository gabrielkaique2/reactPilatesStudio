import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api' // sua URL base do Spring Boot,

});

export default api;