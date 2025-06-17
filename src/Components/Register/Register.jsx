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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErro("");
    setSucesso("");

    // Validações básicas
    if (formData.senha !== formData.confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    if (formData.senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (!formData.email.includes("@")) {
      setErro("Email inválido");
      return;
    }

    // Simular registro bem-sucedido
    setSucesso("Conta criada com sucesso! Redirecionando para o login...");
    
    // Salvar dados do usuário (em um sistema real, seria enviado para uma API)
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const novoUsuario = {
      id: Date.now(),
      nome: formData.nome,
      email: formData.email,
      cpf: formData.cpf,
      telefone: formData.telefone,
      senha: formData.senha, // Em produção, deve ser criptografada
      dataCriacao: new Date().toISOString()
    };
    
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Redirecionar para login após 2 segundos
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Criar Conta</h1>
        
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

        <button type="submit">Criar Conta</button>
        
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