import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";
import "./Register.css";
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErro(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);

    if (!validateForm()) {
      return;
    }

    try {
      // Verificar se o email já existe
      const response = await fetch("http://localhost:3000/usuarios");
      const usuarios = await response.json();
      
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
        tipo: "cliente", // Sempre será cliente
        dataCriacao: new Date().toISOString(),
        role: 'cliente',
        ativo: true
      };

      // Salvar no banco de dados
      await api.post('/usuarios', novoUsuario);

      setSucesso("Conta criada com sucesso! Redirecionando para o login...");
      
      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Erro ao registrar:", error);
      setErro("Erro de conexão. Verifique se o servidor está rodando.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setErro("Todos os campos são obrigatórios.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErro("Por favor, insira um email válido.");
      return false;
    }

    if (formData.senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return false;
    }

    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (formData.telefone && !telefoneRegex.test(formData.telefone)) {
      setErro("Por favor, insira um telefone válido no formato (99) 99999-9999.");
      return false;
    }

    if (!formData.termos) {
      setErro("Você precisa aceitar os termos de uso.");
      return false;
    }

    return true;
  };

  const formatTelefone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Criar Conta de Cliente</h1>
        <p className="register-subtitle">Cadastre-se para agendar seus horários</p>
        
        <div className="input-field">
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            required
            value={formData.nome}
            onChange={handleChange}
          />
          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <FaEnvelope className="icon" />
        </div>

        <div className="input-field">
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            required
            value={formData.cpf}
            onChange={handleChange}
          />
          <FaIdCard className="icon" />
        </div>

        <div className="input-field">
          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            required
            value={formData.telefone}
            onChange={(e) => {
              const formatted = formatTelefone(e.target.value);
              handleChange({
                target: {
                  name: 'telefone',
                  value: formatted
                }
              });
            }}
          />
          <FaPhone className="icon" />
        </div>

        <div className="input-field">
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            required
            value={formData.senha}
            onChange={handleChange}
          />
          <FaLock className="icon" />
        </div>

        <div className="input-field">
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmar senha"
            required
            value={formData.confirmarSenha}
            onChange={handleChange}
          />
          <FaLock className="icon" />
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="termos"
              checked={formData.termos}
              onChange={handleChange}
            />
            Li e aceito os{' '}
            <a href="#" target="_blank" rel="noopener noreferrer">
              termos de uso
            </a>
          </label>
        </div>

        {erro && <p className="error-message">{erro}</p>}
        {sucesso && <p className="success-message">{sucesso}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Criando conta..." : "Criar Conta"}
        </button>
        
        <div className="login-link">
          <p>
            Já tem uma conta? <Link to="/login">Fazer login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register; 