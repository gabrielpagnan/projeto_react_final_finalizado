import { useState, useEffect } from "react";
import "./Usuarios.css";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "cliente"
  });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:3000/usuarios");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId 
        ? `http://localhost:3000/usuarios/${editingId}`
        : "http://localhost:3000/usuarios";
      
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
      tipo: usuario.tipo
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      email: "",
      senha: "",
      tipo: "cliente"
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

  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        <h1>Usuários</h1>
        <button 
          className="btn-novo-usuario"
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            resetForm();
          }}
        >
          Novo Usuário
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