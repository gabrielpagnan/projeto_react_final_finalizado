import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [usuarioAtual, setUsuarioAtual] = useState(null);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioAtual") || "null");
    setUsuarioAtual(usuario);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("logado");
    localStorage.removeItem("usuarioAtual");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Barbearia Express</h2>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/agendamentos">Agendamentos</Link>
        
        {/* Links apenas para administradores */}
        {usuarioAtual?.tipo === "admin" && (
          <>
            <Link to="/profissionais">Profissionais</Link>
            <Link to="/servicos">Serviços</Link>
            <Link to="/usuarios">Usuários</Link>
          </>
        )}
        
        {usuarioAtual && (
          <span className="usuario-info">
            Olá, {usuarioAtual.nome}
            <span className="usuario-tipo">
              ({usuarioAtual.tipo === "admin" ? "Administrador" : "Cliente"})
            </span>
          </span>
        )}
        <button onClick={handleLogout} className="logout-btn">
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;