import { useState, useContext } from 'react';
import { FaUser, FaLock, FaSpinner, FaArrowLeft } from "react-icons/fa";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';

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
  const [touched, setTouched] = useState({
    email: false,
    senha: false
  });

  // Validação de campos
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'E-mail é obrigatório';
        if (!/\S+@\S+\.\S+/.test(value)) return 'E-mail inválido';
        return '';
      case 'senha':
        if (!value) return 'Senha é obrigatória';
        if (value.length < 6) return 'Senha deve ter no mínimo 6 caracteres';
        return '';
      default:
        return '';
    }
  };

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

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  /**
   * Função para enviar o formulário de login
   * @param {Event} e - Evento de submit do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Valida todos os campos antes de enviar
    const emailError = validateField('email', formData.email);
    const senhaError = validateField('senha', formData.senha);
    
    if (emailError || senhaError) {
      setError(emailError || senhaError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.senha);
      navigate('/'); // Redireciona para a página inicial após login
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Credenciais inválidas. Por favor, verifique seu e-mail e senha.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getFieldError = (fieldName) => {
    if (touched[fieldName]) {
      return validateField(fieldName, formData[fieldName]);
    }
    return '';
  };

  return (
    <div className="login-container">
      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        <FaArrowLeft /> Voltar para página inicial
      </button>
      
      <div className="login-card">
        <h1 className="login-title">Bem-vindo(a)!</h1>
        <p className="login-subtitle">Faça login para continuar</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <div className="input-field">
              <input
                type="email"
                placeholder="E-mail"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={touched.email && getFieldError('email') ? 'error' : ''}
              />
              {formData.email === '' && <FaUser className="icon" />}
            </div>
            <span className="hint-text" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95em', fontWeight: 400 }}>Digite seu e-mail cadastrado</span>
            {touched.email && getFieldError('email') && (
              <span className="error-message">{getFieldError('email')}</span>
            )}
          </div>

          <div className="form-group">
            <div className="input-field">
              <input
                type="password"
                placeholder="Senha"
                name="senha"
                value={formData.senha}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={touched.senha && getFieldError('senha') ? 'error' : ''}
              />
              {formData.senha === '' && <FaLock className="icon" />}
            </div>
            <span className="hint-text" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95em', fontWeight: 400 }}>Digite sua senha</span>
            {touched.senha && getFieldError('senha') && (
              <span className="error-message">{getFieldError('senha')}</span>
            )}
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Lembrar-me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Esqueceu a senha?
            </Link>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button" 
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="spinner" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>

          <div className="register-link">
            Não tem uma conta? <Link to="/register">Criar conta</Link>
          </div>
        </form>

        <div className="demo-accounts">
          <p className="demo-title">Contas para teste:</p>
          <div className="demo-account">
            <strong>Admin:</strong> admin@barbearia.com / admin123
          </div>
          <div className="demo-account">
            <strong>Cliente:</strong> joao@email.com / 123456
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;