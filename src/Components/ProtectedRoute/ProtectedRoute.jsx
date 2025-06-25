// Importação das dependências necessárias
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

/**
 * Componente ProtectedRoute - Rota protegida por autenticação
 * Redireciona usuários não autenticados para a página de login
 * 
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Componente filho a ser renderizado
 * @returns {React.ReactNode} Componente filho ou redirecionamento
 */
const ProtectedRoute = ({ children }) => {
  // Obtém o estado de autenticação do contexto
  const { authenticated } = useContext(AuthContext);

  // Se não estiver autenticado, redireciona para o login
  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  // Se estiver autenticado, renderiza o componente filho
  return children;
};

export default ProtectedRoute; 