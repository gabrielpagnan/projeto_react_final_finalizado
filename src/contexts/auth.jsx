// Importação das dependências necessárias
import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

// Criação do contexto de autenticação
export const AuthContext = createContext();

/**
 * Provedor do contexto de autenticação
 * Gerencia o estado de autenticação e fornece funções de login/logout
 */
export const AuthProvider = ({ children }) => {
  // Estados do contexto
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efeito para verificar autenticação ao iniciar
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(JSON.parse(userData));
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  /**
   * Função para realizar login
   * @param {string} email - Email do usuário
   * @param {string} senha - Senha do usuário
   */
  const login = async (email, senha) => {
    try {
      const response = await api.post('/auth/login', { email, senha });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      api.defaults.headers.Authorization = `Bearer ${token}`;
      
      setUser(user);
      setAuthenticated(true);
    } catch (err) {
      throw err;
    }
  };

  /**
   * Função para realizar logout
   */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    api.defaults.headers.Authorization = undefined;
    setUser(null);
    setAuthenticated(false);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ authenticated, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 