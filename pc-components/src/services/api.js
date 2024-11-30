import axios from 'axios';

const API_URL = 'http://localhost:5001/api/components';

export const getComponent = () => axios.get(API_URL);
export const addComponent = (component) => axios.post(API_URL, component);
export const deleteComponent = (id) => axios.delete(`${API_URL}/${id}`);
export const updateComponent = (id, data) => axios.put(`${API_URL}/${id}`, data);
