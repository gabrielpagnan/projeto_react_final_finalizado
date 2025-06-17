import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar se é o admin padrão
    if (username === "admin" && password === "1234") {
      localStorage.setItem("logado", "true");
      localStorage.setItem("usuarioAtual", JSON.stringify({
        nome: "Administrador",
        email: "admin",
        perfil: "admin"
      }));
      navigate("/");
      return;
    }

    // Verificar usuários registrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuario = usuarios.find(u => u.email === username && u.senha === password);

    if (usuario) {
      localStorage.setItem("logado", "true");
      localStorage.setItem("usuarioAtual", JSON.stringify({
        nome: usuario.nome,
        email: usuario.email,
        perfil: "usuario"
      }));
      navigate("/");
    } else {
      setErro("E-mail ou senha inválidos");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Acesse o sistema</h1>
        <div className="input-field">
          <input
            type="text"
            placeholder="E-mail"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>
        <div className="recall-forget">
          <label>
            <input type="checkbox" /> Lembre de mim
          </label>
          <a href="#">Esqueceu sua senha?</a>
        </div>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <button type="submit">Login</button>
        <div className="signup-link">
          <p>
            Não tem uma conta? <Link to="/register">Registrar</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;