import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

/**
 * Componente AdminRoute - Rota protegida para administradores
 * Redireciona usuários não autenticados ou não administradores
 * 
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Componente filho a ser renderizado
 * @returns {React.ReactNode} Componente filho ou redirecionamento
 */
const AdminRoute = ({ children }) => {
  // Obtém o estado de autenticação e usuário do contexto
  const { authenticated, user } = useContext(AuthContext);

  // Se não estiver autenticado, redireciona para o login
  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  // Se não for admin, redireciona para a home
  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  // Se for admin autenticado, renderiza o componente filho
  return children;
};

export default AdminRoute; 