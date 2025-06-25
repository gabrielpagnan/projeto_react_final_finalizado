import { useState, useContext } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../../contexts/auth';

/**
 * Componente Login - Página de autenticação
 * Permite que usuários façam login no sistema
 */
const Login = () => {
  // Hook de navegação e contexto de autenticação
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Estados do componente
  const [formData, setFormData] = useState({ // Dados do formulário
    email: '',
    senha: ''
  });
  const [error, setError] = useState(null); // Estado de erro
  const [loading, setLoading] = useState(false); // Estado de carregamento

  /**
   * Função para lidar com mudanças nos campos do formulário
   * @param {Event} e - Evento de mudança do input
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa mensagem de erro quando usuário começa a digitar
    setError(null);
  };

  /**
   * Função para enviar o formulário de login
   * @param {Event} e - Evento de submit do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.senha);
      navigate('/'); // Redireciona para a página inicial após login
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Erro ao fazer login. Por favor, tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Acesse o sistema</h1>
        <p className="login-subtitle">Faça login para continuar</p>
        
        <div className="input-field">
          <input
            type="text"
            placeholder="E-mail"
            required
            value={formData.email}
            onChange={handleInputChange}
            name="email"
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={formData.senha}
            onChange={handleInputChange}
            name="senha"
          />
          <FaLock className="icon" />
        </div>
        <div className="recall-forget">
          <label>
            <input type="checkbox" /> Lembre de mim
          </label>
          <a href="#">Esqueceu sua senha?</a>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Login"}
        </button>
        <div className="signup-link">
          <p>
            Não tem uma conta? <Link to="/register">Registrar</Link>
          </p>
        </div>
        
        <div className="admin-info">
          <p><strong>Admin:</strong> admin@barbearia.com / admin123</p>
          <p><strong>Cliente:</strong> joao@email.com / 123456</p>
        </div>
      </form>
    </div>
  );
};

export default Login;