// Importação do axios
import axios from 'axios';

// Criação da instância do axios com configurações base
const api = axios.create({
  baseURL: 'http://localhost:3000', // URL base da API
  timeout: 5000, // Timeout de 5 segundos
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; 