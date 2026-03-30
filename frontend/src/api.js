import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export const getUsers = () => api.get('/users');
export const getUsersSummary = () => api.get('/users/summary');
export const getUser = (id) => api.get(`/users/${id}`);
export const createUser = (data) => api.post('/users', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);

export const login = (data) => api.post('/login', data);

export const getAppointments = (userId) => api.get(`/appointments/user/${userId}`);
export const createAppointment = (data) => api.post('/appointments', data);
export const updateAppointment = (id, data) => api.put(`/appointments/${id}`, data);
export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);

export const getPrescriptions = (userId) => api.get(`/prescriptions/user/${userId}`);
export const createPrescription = (data) => api.post('/prescriptions', data);
export const updatePrescription = (id, data) => api.put(`/prescriptions/${id}`, data);
export const deletePrescription = (id) => api.delete(`/prescriptions/${id}`);

export const getMedications = () => api.get('/medications');
export const getDosages = () => api.get('/dosages');
