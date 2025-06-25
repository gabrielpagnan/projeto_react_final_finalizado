import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaIdCard, FaSpinner, FaArrowLeft } from "react-icons/fa";
import "../Login/Login.css";
import { useNavigate, Link } from "react-router-dom";
import api from '../../services/api';

/**
 * Componente Register - Página de cadastro de usuários
 * Permite que novos usuários criem uma conta no sistema
 */
const Register = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    termos: false
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    nome: false,
    email: false,
    cpf: false,
    telefone: false,
    senha: false,
    confirmarSenha: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErro("");
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'nome':
        if (!value) return 'Nome é obrigatório';
        return '';
      case 'email':
        if (!value) return 'E-mail é obrigatório';
        if (!/\S+@\S+\.\S+/.test(value)) return 'E-mail inválido';
        return '';
      case 'cpf':
        if (!value) return 'CPF é obrigatório';
        if (!/^\d{11}$/.test(value.replace(/\D/g, ''))) return 'CPF inválido';
        return '';
      case 'telefone':
        if (!value) return 'Telefone é obrigatório';
        if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(value)) return 'Telefone inválido';
        return '';
      case 'senha':
        if (!value) return 'Senha é obrigatória';
        if (value.length < 6) return 'Senha deve ter no mínimo 6 caracteres';
        return '';
      case 'confirmarSenha':
        if (!value) return 'Confirme a senha';
        if (value !== formData.senha) return 'As senhas não coincidem';
        return '';
      default:
        return '';
    }
  };

  const getFieldError = (fieldName) => {
    if (touched[fieldName]) {
      return validateField(fieldName, formData[fieldName]);
    }
    return '';
  };

  const formatTelefone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);

    // Validação de todos os campos
    const fields = ['nome', 'email', 'cpf', 'telefone', 'senha', 'confirmarSenha'];
    for (let field of fields) {
      if (validateField(field, formData[field])) {
        setTouched(prev => ({ ...prev, [field]: true }));
        setErro(validateField(field, formData[field]));
        setLoading(false);
        return;
      }
    }
    if (!formData.termos) {
      setErro('Você precisa aceitar os termos de uso.');
      setLoading(false);
      return;
    }

    try {
      // Verificar se o email já existe
      const response = await api.get('/usuarios');
      const usuarios = response.data;
      const emailExiste = usuarios.find(u => u.email === formData.email);
      if (emailExiste) {
        setErro("Este email já está cadastrado");
        setLoading(false);
        return;
      }
      // Criar novo usuário
      const novoUsuario = {
        nome: formData.nome,
        email: formData.email,
        cpf: formData.cpf,
        telefone: formData.telefone,
        senha: formData.senha,
        tipo: "cliente",
        dataCriacao: new Date().toISOString(),
        ativo: true
      };
      await api.post('/usuarios', novoUsuario);
      setSucesso("Conta criada com sucesso! Redirecionando para o login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErro("Erro de conexão. Verifique se o servidor está rodando.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <button className="back-button" onClick={() => navigate('/')}> <FaArrowLeft /> Voltar para página inicial </button>
      <div className="login-card">
        <h1 className="login-title">Criar Conta</h1>
        <p className="login-subtitle">Cadastre-se para agendar seus horários</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <div className="input-field">
              <input
                type="text"
                name="nome"
                placeholder="Nome completo"
                value={formData.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.nome && getFieldError('nome') ? 'error' : ''}
              />
              {formData.nome === '' && <FaUser className="icon" />}
            </div>
            <span className="hint-text" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95em', fontWeight: 400 }}>Digite seu nome completo</span>
            {touched.nome && getFieldError('nome') && (
              <span className="error-message">{getFieldError('nome')}</span>
            )}
          </div>
          <div className="form-group">
            <div className="input-field">
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.email && getFieldError('email') ? 'error' : ''}
              />
              {formData.email === '' && <FaEnvelope className="icon" />}
            </div>
            <span className="hint-text" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95em', fontWeight: 400 }}>Digite um e-mail válido (ex: seuemail@email.com)</span>
            {touched.email && getFieldError('email') && (
              <span className="error-message">{getFieldError('email')}</span>
            )}
          </div>
          <div className="form-group">
            <div className="input-field">
              <input
                type="text"
                name="cpf"
                placeholder="CPF (apenas números)"
                value={formData.cpf}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.cpf && getFieldError('cpf') ? 'error' : ''}
                maxLength={14}
              />
              {formData.cpf === '' && <FaIdCard className="icon" />}
            </div>
            <span className="hint-text" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95em', fontWeight: 400 }}>Digite seu CPF sem pontos ou traços</span>
            {touched.cpf && getFieldError('cpf') && (
              <span className="error-message">{getFieldError('cpf')}</span>
            )}
          </div>
          <div className="form-group">
            <div className="input-field">
              <input
                type="tel"
                name="telefone"
                placeholder="Telefone (99) 99999-9999"
                value={formData.telefone}
                onChange={e => handleChange({ target: { name: 'telefone', value: formatTelefone(e.target.value) } })}
                onBlur={handleBlur}
                className={touched.telefone && getFieldError('telefone') ? 'error' : ''}
                maxLength={15}
              />
              {formData.telefone === '' && <FaPhone className="icon" />}
            </div>
            <span className="hint-text" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95em', fontWeight: 400 }}>Digite seu telefone com DDD (ex: (48) 99999-9999)</span>
            {touched.telefone && getFieldError('telefone') && (
              <span className="error-message">{getFieldError('telefone')}</span>
            )}
          </div>
          <div className="form-group">
            <div className="input-field">
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.senha && getFieldError('senha') ? 'error' : ''}
              />
              {formData.senha === '' && <FaLock className="icon" />}
            </div>
            <span className="hint-text" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95em', fontWeight: 400 }}>Crie uma senha com pelo menos 6 caracteres</span>
            {touched.senha && getFieldError('senha') && (
              <span className="error-message">{getFieldError('senha')}</span>
            )}
          </div>
          <div className="form-group">
            <div className="input-field">
              <input
                type="password"
                name="confirmarSenha"
                placeholder="Confirmar senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.confirmarSenha && getFieldError('confirmarSenha') ? 'error' : ''}
              />
              {formData.confirmarSenha === '' && <FaLock className="icon" />}
            </div>
            <span className="hint-text" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95em', fontWeight: 400 }}>Repita a senha digitada acima</span>
            {touched.confirmarSenha && getFieldError('confirmarSenha') && (
              <span className="error-message">{getFieldError('confirmarSenha')}</span>
            )}
          </div>
          <div className="form-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label htmlFor="termos" style={{ color: 'rgba(255,255,255,0.8)', margin: 0, cursor: 'pointer', order: 1 }}>
                Aceito os termos de uso
              </label>
              <input
                type="checkbox"
                name="termos"
                checked={formData.termos}
                onChange={handleChange}
                style={{ accentColor: '#3498db', marginLeft: 8, order: 2 }}
                id="termos"
              />
            </div>
          </div>
          {erro && <div className="error-message">{erro}</div>}
          {sucesso && <div className="success-message" style={{ color: '#27ae60', marginBottom: 8 }}>{sucesso}</div>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (<><FaSpinner className="spinner" />Criando conta...</>) : 'Criar conta'}
          </button>
          <div className="register-link">
            Já tem uma conta? <Link to="/login">Entrar</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register; 