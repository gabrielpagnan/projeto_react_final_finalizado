import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro("");
    setLoading(true);

    try {
      // Buscar usuários no banco de dados
      const response = await fetch("http://localhost:3000/usuarios");
      const usuarios = await response.json();
      
      // Verificar se é o admin padrão
      if (username === "admin@barbearia.com" && password === "admin123") {
        const admin = usuarios.find(u => u.email === "admin@barbearia.com");
        if (admin) {
          localStorage.setItem("logado", "true");
          localStorage.setItem("usuarioAtual", JSON.stringify({
            id: admin.id,
            nome: admin.nome,
            email: admin.email,
            tipo: admin.tipo
          }));
          navigate("/");
          return;
        }
      }

      // Verificar usuários registrados
      const usuario = usuarios.find(u => u.email === username && u.senha === password);

      if (usuario) {
        localStorage.setItem("logado", "true");
        localStorage.setItem("usuarioAtual", JSON.stringify({
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          tipo: usuario.tipo
        }));
        navigate("/");
      } else {
        setErro("E-mail ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErro("Erro de conexão. Verifique se o servidor está rodando.");
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