import { useState, useEffect } from "react";
import "./Servicos.css";

function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    duracao: ""
  });

  useEffect(() => {
    fetchServicos();
  }, []);

  const fetchServicos = async () => {
    try {
      const response = await fetch("http://localhost:3000/servicos");
      const data = await response.json();
      setServicos(data);
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId 
        ? `http://localhost:3000/servicos/${editingId}`
        : "http://localhost:3000/servicos";
      
      const method = editingId ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          preco: parseFloat(formData.preco),
          duracao: parseInt(formData.duracao)
        }),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingId(null);
        resetForm();
        fetchServicos();
      }
    } catch (error) {
      console.error("Erro ao salvar serviço:", error);
    }
  };

  const handleEdit = (servico) => {
    setFormData({
      nome: servico.nome,
      descricao: servico.descricao,
      preco: servico.preco.toString(),
      duracao: servico.duracao.toString()
    });
    setEditingId(servico.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
      try {
        const response = await fetch(`http://localhost:3000/servicos/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchServicos();
        }
      } catch (error) {
        console.error("Erro ao excluir serviço:", error);
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
      descricao: "",
      preco: "",
      duracao: ""
    });
  };

  const formatarPreco = (preco) => {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  };

  const formatarDuracao = (duracao) => {
    if (duracao < 60) {
      return `${duracao} min`;
    }
    const horas = Math.floor(duracao / 60);
    const minutos = duracao % 60;
    if (minutos === 0) {
      return `${horas}h`;
    }
    return `${horas}h ${minutos}min`;
  };

  return (
    <div className="servicos-container">
      <div className="servicos-header">
        <h1>Serviços</h1>
        <button 
          className="btn-novo-servico"
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            resetForm();
          }}
        >
          Novo Serviço
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>{editingId ? "Editar Serviço" : "Novo Serviço"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome do Serviço:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descrição:</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preço (R$):</label>
                  <input
                    type="number"
                    name="preco"
                    value={formData.preco}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Duração (minutos):</label>
                  <input
                    type="number"
                    name="duracao"
                    value={formData.duracao}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
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

      <div className="servicos-list">
        {servicos.length === 0 ? (
          <p className="no-servicos">Nenhum serviço encontrado.</p>
        ) : (
          <div className="servicos-grid">
            {servicos.map((servico) => (
              <div key={servico.id} className="servico-card">
                <div className="servico-header">
                  <h3>{servico.nome}</h3>
                  <div className="servico-actions">
                    <button 
                      className="btn-editar"
                      onClick={() => handleEdit(servico)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn-excluir"
                      onClick={() => handleDelete(servico.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
                <div className="servico-info">
                  <p className="servico-descricao">{servico.descricao}</p>
                  <div className="servico-detalhes">
                    <span className="preco">{formatarPreco(servico.preco)}</span>
                    <span className="duracao">{formatarDuracao(servico.duracao)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Servicos; 