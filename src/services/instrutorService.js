import api from './api';

export const getInstrutores = () => api.get('/instructors');
export const getInstrutor = (id) => api.get(`/instructors/${id}`);
export const createInstrutor = (data) => api.post('/instructors', data);
export const updateInstrutor = (id, data) => api.put(`/instructors/${id}`, data);
export const deleteInstrutor = (id) => api.delete(`/instructors/${id}`);
