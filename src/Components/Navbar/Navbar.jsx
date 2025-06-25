import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUser, FaSignOutAlt, FaCalendar, FaCut, FaUsers } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuarioAtual, setUsuarioAtual] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioAtual") || "null");
    setUsuarioAtual(usuario);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("logado");
    localStorage.removeItem("usuarioAtual");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  // Verifica se o link está ativo
  const isLinkAtivo = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Barbearia Express
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={menuAberto ? "active" : ""}></div>
          <div className={menuAberto ? "active" : ""}></div>
          <div className={menuAberto ? "active" : ""}></div>
        </div>

        <ul className={`nav-menu ${menuAberto ? "active" : ""}`}>
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isLinkAtivo("/") ? "active" : ""}`}
              onClick={() => setMenuAberto(false)}
            >
              Home
            </Link>
          </li>
          
          <li>
            <Link 
              to="/agendamentos" 
              className={`nav-link ${isLinkAtivo("/agendamentos") ? "active" : ""}`}
              onClick={() => setMenuAberto(false)}
            >
              <FaCalendar className="nav-icon" />
              Agendamentos
            </Link>
          </li>

          {usuarioAtual?.tipo === "admin" && (
            <>
              <li>
                <Link 
                  to="/profissionais" 
                  className={`nav-link ${isLinkAtivo("/profissionais") ? "active" : ""}`}
                  onClick={() => setMenuAberto(false)}
                >
                  <FaCut className="nav-icon" />
                  Profissionais
                </Link>
              </li>
              <li>
                <Link 
                  to="/servicos" 
                  className={`nav-link ${isLinkAtivo("/servicos") ? "active" : ""}`}
                  onClick={() => setMenuAberto(false)}
                >
                  <FaCut className="nav-icon" />
                  Serviços
                </Link>
              </li>
              <li>
                <Link 
                  to="/usuarios" 
                  className={`nav-link ${isLinkAtivo("/usuarios") ? "active" : ""}`}
                  onClick={() => setMenuAberto(false)}
                >
                  <FaUsers className="nav-icon" />
                  Usuários
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="nav-user">
          {usuarioAtual ? (
            <>
              <div className="user-info">
                <FaUser className="user-icon" />
                <span className="user-name">{usuarioAtual.nome}</span>
                <span className="user-type">
                  {usuarioAtual.tipo === "admin" ? "Administrador" : "Cliente"}
                </span>
              </div>
              <button onClick={handleLogout} className="nav-button logout">
                <FaSignOutAlt />
                <span>Sair</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-button login">
              <FaUser />
              <span>Entrar</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;