import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Servicos.css";

/**
 * Componente Servicos - Página de serviços oferecidos
 * Exibe a lista de serviços disponíveis na barbearia
 */
function Servicos() {
  // Hook de navegação
  const navigate = useNavigate();
  
  // Estados do componente
  const [servicos, setServicos] = useState([]); // Lista de serviços
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    duracao: ""
  });
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  /**
   * Efeito para carregar os serviços ao montar o componente
   * Faz a requisição à API e atualiza o estado
   */
  useEffect(() => {
    const fetchServicos = async () => {
      try {
        setLoading(true);
        const response = await api.get("/servicos");
        setServicos(response.data);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar os serviços. Tente novamente mais tarde.");
        console.error("Erro ao buscar serviços:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServicos();
  }, []);

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

  /**
   * Função para formatar o preço em moeda brasileira
   * @param {number} valor - Valor a ser formatado
   * @returns {string} Valor formatado em BRL
   */
  const formatarPreco = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
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

  /**
   * Função para iniciar o processo de agendamento
   * @param {number} servicoId - ID do serviço selecionado
   */
  const handleAgendar = (servicoId) => {
    navigate(`/agendamentos/novo?servico=${servicoId}`);
  };

  // Renderização condicional baseada no estado de loading e erro
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Carregando serviços...</p>
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
    <div className="servicos-container">
      <div className="servicos-header">
        <h1 className="servicos-title">Nossos Serviços</h1>
        <p className="servicos-description">
          Conheça nossa variedade de serviços profissionais para cuidar do seu visual
        </p>
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
                <div className="servico-footer">
                  <div className="disponibilidade">
                    <span className={`disponibilidade-dot ${servico.disponivel ? '' : 'indisponivel'}`}></span>
                    <span>{servico.disponivel ? 'Disponível' : 'Indisponível'}</span>
                  </div>
                  <button
                    className="agendar-button"
                    onClick={() => handleAgendar(servico.id)}
                    disabled={!servico.disponivel}
                  >
                    <i className="fas fa-calendar-alt"></i>
                    Agendar
                  </button>
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