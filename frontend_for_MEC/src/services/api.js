import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust port as needed

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Products
export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);

// Users
export const createUser = (userData) => api.post('/users', userData);
export const loginUser = (loginData) => api.post('/users/login', loginData);

// Orders
export const createOrder = (orderData) => api.post('/orders', orderData);