import { useState, useEffect } from "react";
import api from "../../services/api";
import "./Usuarios.css";

/**
 * Componente Usuarios - Página de gerenciamento de usuários
 * Exclusivo para administradores, permite visualizar e gerenciar usuários do sistema
 */
function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "cliente",
    telefone: "",
    ativo: true
  });

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const response = await api.get("/usuarios");
        setUsuarios(response.data);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar os usuários. Tente novamente mais tarde.");
        console.error("Erro ao buscar usuários:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId ? `http://localhost:3000/usuarios/${editingId}` : "http://localhost:3000/usuarios";
      const method = editingId ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingId(null);
        resetForm();
        fetchUsuarios();
      }
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  const handleEdit = (usuario) => {
    setFormData({
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      tipo: usuario.tipo,
      telefone: usuario.telefone,
      ativo: usuario.ativo
    });
    setEditingId(usuario.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchUsuarios();
        }
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      email: "",
      senha: "",
      tipo: "cliente",
      telefone: "",
      ativo: true
    });
  };

  const getTipoLabel = (tipo) => {
    switch (tipo) {
      case "admin": return "Administrador";
      case "cliente": return "Cliente";
      default: return tipo;
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case "admin": return "red";
      case "cliente": return "green";
      default: return "gray";
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Carregando usuários...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2 className="error-title">Ops! Algo deu errado</h2>
        <p className="error-message">{error}</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <h1>Gerenciar Usuários</h1>
        <button 
          className="btn-novo-usuario"
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            resetForm();
          }}
        >
          {showForm ? 'Cancelar' : 'Novo Usuário'}
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>{editingId ? "Editar Usuário" : "Novo Usuário"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Senha:</label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Telefone:</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Tipo:</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  required
                >
                  <option value="cliente">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="ativo"
                    checked={formData.ativo}
                    onChange={handleInputChange}
                  />
                  Usuário ativo
                </label>
              </div>

              <div className="form-buttons">
                <button type="submit" className="btn-salvar">
                  {editingId ? "Atualizar" : "Salvar"}
                </button>
                <button 
                  type="button" 
                  className="btn-cancelar"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    resetForm();
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="usuarios-list">
        {usuarios.length === 0 ? (
          <p className="no-usuarios">Nenhum usuário encontrado.</p>
        ) : (
          <div className="usuarios-grid">
            {usuarios.map((usuario) => (
              <div key={usuario.id} className="usuario-card">
                <div className="usuario-header">
                  <h3>{usuario.nome}</h3>
                  <div className="usuario-actions">
                    <button 
                      className="btn-editar"
                      onClick={() => handleEdit(usuario)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn-excluir"
                      onClick={() => handleDelete(usuario.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
                <div className="usuario-info">
                  <p><strong>Email:</strong> {usuario.email}</p>
                  <p><strong>Telefone:</strong> {usuario.telefone}</p>
                  <p><strong>Tipo:</strong> 
                    <span className={`tipo tipo-${getTipoColor(usuario.tipo)}`}>
                      {getTipoLabel(usuario.tipo)}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Usuarios; 