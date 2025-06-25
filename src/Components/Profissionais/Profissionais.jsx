import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';
import "./Profissionais.css";

/**
 * Componente Profissionais - Página de profissionais da barbearia
 * Exibe a lista de profissionais e permite gerenciamento (para admins)
 */
const Profissionais = () => {
  // Hook de navegação e contexto de autenticação
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Estados do componente
  const [profissionais, setProfissionais] = useState([]); // Lista de profissionais
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro
  const [showForm, setShowForm] = useState(false); // Controle do formulário
  const [formData, setFormData] = useState({ // Dados do formulário
    nome: '',
    especialidade: '',
    experiencia: '',
    foto: '',
    disponivel: true
  });



  /**
   * Efeito para carregar os profissionais ao montar o componente
   * Faz a requisição à API e atualiza o estado
   */
  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        setLoading(true);
        const response = await api.get('/profissionais');
        setProfissionais(response.data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar os profissionais. Tente novamente mais tarde.');
        console.error('Erro ao buscar profissionais:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfissionais();
  }, []);

  /**
   * Função para lidar com mudanças nos campos do formulário
   * @param {Event} e - Evento de mudança do input
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  /**
   * Função para enviar o formulário de novo profissional
   * @param {Event} e - Evento de submit do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/profissionais', formData);
      const response = await api.get('/profissionais');
      setProfissionais(response.data);
      setShowForm(false);
      setFormData({
        nome: '',
        especialidade: '',
        experiencia: '',
        foto: '',
        disponivel: true
      });
    } catch (err) {
      console.error('Erro ao adicionar profissional:', err);
      alert('Erro ao adicionar profissional. Tente novamente.');
    }
  };

  /**
   * Função para remover um profissional
   * @param {number} id - ID do profissional a ser removido
   */
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este profissional?')) {
      try {
        await api.delete(`/profissionais/${id}`);
        setProfissionais(prev => prev.filter(prof => prof.id !== id));
      } catch (err) {
        console.error('Erro ao remover profissional:', err);
        alert('Erro ao remover profissional. Tente novamente.');
      }
    }
  };

  /**
   * Função para iniciar o processo de agendamento
   * @param {number} profissionalId - ID do profissional selecionado
   */
  const handleAgendar = (profissionalId) => {
    navigate(`/agendamentos/novo?profissional=${profissionalId}`);
  };

  // Renderização condicional baseada no estado de loading e erro
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Carregando profissionais...</p>
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
    <div className="profissionais-container">
      {/* Cabeçalho da página */}
      <div className="profissionais-header">
        <h1 className="profissionais-title">Nossa Equipe</h1>
        <p className="profissionais-description">
          Conheça nossos profissionais altamente qualificados
        </p>
        
        {/* Botão de adicionar novo profissional (visível para todos) */}
        <button 
          className="btn-novo-profissional"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : 'Novo Profissional'}
        </button>
      </div>

      {/* Formulário de novo profissional */}
      {showForm && (
        <form onSubmit={handleSubmit} className="profissional-form" style={{ marginBottom: '2rem', background: '#f9f9f9', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="especialidade">Especialidade:</label>
            <input
              type="text"
              id="especialidade"
              name="especialidade"
              value={formData.especialidade}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="experiencia">Experiência:</label>
            <input
              type="text"
              id="experiencia"
              name="experiencia"
              value={formData.experiencia}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="foto">URL da Foto:</label>
            <input
              type="url"
              id="foto"
              name="foto"
              value={formData.foto}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="disponivel"
                checked={formData.disponivel}
                onChange={handleInputChange}
              />
              Disponível para agendamentos
            </label>
          </div>

          <button type="submit" className="btn-submit">
            Adicionar Profissional
          </button>
        </form>
      )}

      {/* Grid de profissionais */}
      <div className="profissionais-grid">
        {profissionais.map((profissional) => (
          <div key={profissional.id} className="profissional-card">
            {/* Imagem do profissional */}
            <div className="profissional-image-container">
              <img
                src={profissional.foto || '/default-avatar.png'}
                alt={profissional.nome}
                className="profissional-image"
              />
              <div className={`status-badge ${profissional.disponivel ? 'disponivel' : 'indisponivel'}`}>
                {profissional.disponivel ? 'Disponível' : 'Indisponível'}
              </div>
            </div>

            {/* Informações do profissional */}
            <div className="profissional-info">
              <h2 className="profissional-nome">{profissional.nome}</h2>
              <p className="profissional-especialidade">{profissional.especialidade}</p>
              <p className="profissional-experiencia">{profissional.experiencia}</p>
              
              {/* Avaliação do profissional */}
              <div className="profissional-rating">
                <span className="stars">★★★★★</span>
                <span className="rating-count">(32 avaliações)</span>
              </div>

              {/* Ações do card */}
              <div className="profissional-actions">
                <button
                  className="btn-agendar"
                  onClick={() => handleAgendar(profissional.id)}
                  disabled={'disponivel' in profissional ? !profissional.disponivel : false}
                >
                  Agendar Horário
                </button>

                {/* Botões de admin */}
                {user?.role === 'admin' && (
                  <button
                    className="btn-remover"
                    onClick={() => handleDelete(profissional.id)}
                  >
                    Remover
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profissionais; 