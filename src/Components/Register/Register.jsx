import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
    confirmarSenha: ""
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);

    // Validações básicas
    if (formData.senha !== formData.confirmarSenha) {
      setErro("As senhas não coincidem");
      setLoading(false);
      return;
    }

    if (formData.senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres");
      setLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setErro("Email inválido");
      setLoading(false);
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
        dataCriacao: new Date().toISOString()
      };

      // Salvar no banco de dados
      const saveResponse = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoUsuario),
      });

      if (saveResponse.ok) {
        setSucesso("Conta criada com sucesso! Redirecionando para o login...");
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setErro("Erro ao criar conta. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      setErro("Erro de conexão. Verifique se o servidor está rodando.");
    } finally {
      setLoading(false);
    }
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
            onChange={handleChange}
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