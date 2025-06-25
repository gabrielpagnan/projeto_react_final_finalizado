// Importação das dependências necessárias
import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

// Criação do contexto de autenticação
export const AuthContext = createContext();

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

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
      // Buscar usuário pelo email
      const response = await api.get(`/usuarios?email=${email}`);
      const users = response.data;

      // Verificar se encontrou o usuário e se a senha está correta
      const user = users.find(u => u.email === email && u.senha === senha);

      if (!user) {
        throw new Error('Credenciais inválidas');
      }

      // Gerar um token simples (em produção, use JWT adequado)
      const token = btoa(JSON.stringify({ id: user.id, email: user.email }));

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      api.defaults.headers.Authorization = `Bearer ${token}`;
      
      setUser(user);
      setAuthenticated(true);
    } catch (err) {
      if (err.message === 'Credenciais inválidas') {
        throw new Error('Credenciais inválidas. Por favor, verifique seu e-mail e senha.');
      } else {
        throw new Error('Erro ao fazer login. Por favor, tente novamente.');
      }
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