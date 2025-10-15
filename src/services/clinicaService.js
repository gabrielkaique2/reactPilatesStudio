import api from './api';

export const getClinicas = () => api.get('/clinics');
export const getClinica = (id) => api.get(`/clinics/${id}`);
export const createClinica = (data) => api.post('/clinics', data);
export const updateClinica = (id, data) => api.put(`/clinics/${id}`, data);
export const deleteClinica = (id) => api.delete(`/clinics/${id}`);


