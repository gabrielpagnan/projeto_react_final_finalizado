import { useState, useEffect } from "react";
import api from "../../services/api";
import "./Usuarios.css";
import { useNavigate } from 'react-router-dom';

/**
 * Componente Usuarios - Página de gerenciamento de usuários
 * Exclusivo para administradores, permite visualizar e gerenciar usuários do sistema
 */
function Usuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: 'cliente',
    telefone: '',
    ativo: true
  });

  // Busca usuários
  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const response = await api.get('/usuarios');
      setUsuarios(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar os usuários. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/usuarios/${editingId}`, formData);
      } else {
        await api.post('/usuarios', formData);
      }
      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchUsuarios();
    } catch (error) {
      alert('Erro ao salvar usuário.');
    }
  };

  const handleEdit = (usuario) => {
    setFormData({
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha || '',
      tipo: usuario.tipo,
      telefone: usuario.telefone,
      ativo: usuario.ativo
    });
    setEditingId(usuario.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await api.delete(`/usuarios/${id}`);
        fetchUsuarios();
      } catch (error) {
        alert('Erro ao excluir usuário.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      senha: '',
      tipo: 'cliente',
      telefone: '',
      ativo: true
    });
  };

  const getTipoLabel = (tipo) => {
    switch (tipo) {
      case 'admin': return 'Administrador';
      case 'cliente': return 'Cliente';
      default: return tipo;
    }
  };

  // Renderização condicional
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
        <button className="retry-button" onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="profissionais-container">
      <div className="profissionais-header">
        <h1 className="profissionais-title">Usuários do Sistema</h1>
        <p className="profissionais-description">
          Gerencie os usuários cadastrados, edite ou exclua conforme necessário.
        </p>
        <button className="btn-novo-profissional" onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          resetForm();
        }}>
          {showForm ? 'Cancelar' : 'Novo Usuário'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="profissional-form" style={{ marginBottom: '2rem', background: '#f9f9f9', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="tipo">Tipo:</label>
            <select id="tipo" name="tipo" value={formData.tipo} onChange={handleInputChange} required>
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div className="form-group checkbox">
            <label>
              <input type="checkbox" name="ativo" checked={formData.ativo} onChange={handleInputChange} /> Usuário ativo
            </label>
          </div>
          <button type="submit" className="btn-submit">
            {editingId ? 'Atualizar' : 'Salvar'}
          </button>
        </form>
      )}

      <div className="profissionais-grid">
        {usuarios.length === 0 ? (
          <p className="no-usuarios">Nenhum usuário encontrado.</p>
        ) : (
          usuarios.map((usuario) => (
            <div key={usuario.id} className="profissional-card">
              <div className="profissional-image-container">
                <div className="profissional-image" style={{
                  width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, background: '#eee', color: '#888', fontWeight: 700
                }}>
                  {usuario.nome ? usuario.nome.charAt(0).toUpperCase() : '?'}
                </div>
                <div className={`status-badge ${usuario.ativo ? 'disponivel' : 'indisponivel'}`}></div>
              </div>
              <div className="profissional-info">
                <h2 className="profissional-nome">{usuario.nome}</h2>
                <p className="profissional-especialidade">{getTipoLabel(usuario.tipo)}</p>
                <p className="profissional-descricao">{usuario.email}</p>
                <p className="profissional-descricao">{usuario.telefone}</p>
                <div className="profissional-actions" style={{ marginTop: 16 }}>
                  <button className="btn-agendar" style={{ background: '#f39c12', color: '#fff', marginRight: 8 }} onClick={() => handleEdit(usuario)}>
                    Editar
                  </button>
                  <button className="btn-remover" onClick={() => handleDelete(usuario.id)}>
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Usuarios; 