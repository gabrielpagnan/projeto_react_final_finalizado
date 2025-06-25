import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Agendamentos.css';

const NovoAgendamento = () => {
  const navigate = useNavigate();
  const [servicos, setServicos] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [formData, setFormData] = useState({
    servicoId: '',
    profissionalId: '',
    data: '',
    horario: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicosRes, profissionaisRes] = await Promise.all([
          api.get('/servicos'),
          api.get('/profissionais')
        ]);

        setServicos(servicosRes.data);
        setProfissionais(profissionaisRes.data);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar os dados. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/agendamentos', {
        ...formData,
        status: 'pendente'
      });
      alert('Agendamento criado com sucesso!');
      navigate('/agendamentos');
    } catch (err) {
      console.error('Erro ao criar agendamento:', err);
      alert('Erro ao criar agendamento. Por favor, tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Carregando...</p>
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
    <div className="novo-agendamento-container">
      <div className="novo-agendamento-header">
        <h1>Novo Agendamento</h1>
        <button
          className="btn-voltar"
          onClick={() => navigate('/agendamentos')}
        >
          Voltar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="novo-agendamento-form">
        <div className="form-group">
          <label htmlFor="servico">Serviço:</label>
          <select
            id="servico"
            name="servicoId"
            value={formData.servicoId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um serviço</option>
            {servicos.map(servico => (
              <option key={servico.id} value={servico.id}>
                {servico.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="profissional">Profissional:</label>
          <select
            id="profissional"
            name="profissionalId"
            value={formData.profissionalId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um profissional</option>
            {profissionais.map(profissional => (
              <option key={profissional.id} value={profissional.id}>
                {profissional.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="data">Data:</label>
          <input
            type="date"
            id="data"
            name="data"
            value={formData.data}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="horario">Horário:</label>
          <input
            type="time"
            id="horario"
            name="horario"
            value={formData.horario}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-confirmar">
          Confirmar Agendamento
        </button>
      </form>
    </div>
  );
};

export default NovoAgendamento; 