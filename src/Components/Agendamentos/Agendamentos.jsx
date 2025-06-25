import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';
import "./Agendamentos.css";

/**
 * Componente Agendamentos - Página de gerenciamento de agendamentos
 * Permite visualizar, criar, editar e cancelar agendamentos
 */
const Agendamentos = () => {
  // Hook de navegação e contexto de autenticação
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Estados do componente
  const [agendamentos, setAgendamentos] = useState([]); // Lista de agendamentos
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro
  const [filtro, setFiltro] = useState('todos'); // Filtro de status

  /**
   * Efeito para carregar os agendamentos ao montar o componente
   * Faz a requisição à API e atualiza o estado
   */
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        setLoading(true);
        // Se for admin, busca todos os agendamentos, senão busca apenas do usuário
        const endpoint = user?.role === 'admin' 
          ? '/agendamentos'
          : `/agendamentos?userId=${user.id}`;
        
        const response = await api.get(endpoint);
        setAgendamentos(response.data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar os agendamentos. Tente novamente mais tarde.');
        console.error('Erro ao buscar agendamentos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, [user]);

  /**
   * Função para formatar data e hora
   * @param {string} dataHora - String de data e hora no formato ISO
   * @returns {string} Data e hora formatadas
   */
  const formatarDataHora = (dataHora) => {
    return new Date(dataHora).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Função para cancelar um agendamento
   * @param {number} id - ID do agendamento a ser cancelado
   */
  const handleCancelar = async (id) => {
    if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      try {
        await api.patch(`/agendamentos/${id}`, { status: 'cancelado' });
        setAgendamentos(prev => 
          prev.map(ag => 
            ag.id === id ? { ...ag, status: 'cancelado' } : ag
          )
        );
      } catch (err) {
        console.error('Erro ao cancelar agendamento:', err);
        alert('Erro ao cancelar agendamento. Tente novamente.');
      }
    }
  };

  /**
   * Função para concluir um agendamento
   * @param {number} id - ID do agendamento a ser concluído
   */
  const handleConcluir = async (id) => {
    try {
      await api.patch(`/agendamentos/${id}`, { status: 'concluido' });
      setAgendamentos(prev => 
        prev.map(ag => 
          ag.id === id ? { ...ag, status: 'concluido' } : ag
        )
      );
    } catch (err) {
      console.error('Erro ao concluir agendamento:', err);
      alert('Erro ao concluir agendamento. Tente novamente.');
    }
  };

  /**
   * Função para filtrar agendamentos por status
   * @param {Array} agendamentos - Lista de agendamentos
   * @returns {Array} Agendamentos filtrados
   */
  const filtrarAgendamentos = (agendamentos) => {
    if (filtro === 'todos') return agendamentos;
    return agendamentos.filter(ag => ag.status === filtro);
  };

  // Renderização condicional baseada no estado de loading e erro
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Carregando agendamentos...</p>
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
    <div className="agendamentos-container">
      {/* Cabeçalho da página */}
      <div className="agendamentos-header">
        <h1 className="agendamentos-title">Meus Agendamentos</h1>
        
        {/* Botões de ação */}
        <div className="header-actions">
          <button
            className="btn-novo-agendamento"
            onClick={() => navigate('/agendamentos/novo')}
          >
            Novo Agendamento
          </button>

          {/* Filtro de status */}
          <select
            className="filtro-status"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="pendente">Pendentes</option>
            <option value="concluido">Concluídos</option>
            <option value="cancelado">Cancelados</option>
          </select>
        </div>
      </div>

      {/* Tabela de agendamentos */}
      <div className="agendamentos-table-container">
        <table className="agendamentos-table">
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>Serviço</th>
              <th>Profissional</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrarAgendamentos(agendamentos).map((agendamento) => (
              <tr key={agendamento.id}>
                <td>{formatarDataHora(agendamento.dataHora)}</td>
                <td>{agendamento.servico.nome}</td>
                <td>{agendamento.profissional.nome}</td>
                <td>
                  <span className={`status-badge ${agendamento.status}`}>
                    {agendamento.status}
                  </span>
                </td>
                <td>
                  {/* Ações disponíveis baseadas no status e papel do usuário */}
                  {agendamento.status === 'pendente' && (
                    <>
                      {user?.role === 'admin' && (
                        <button
                          className="btn-concluir"
                          onClick={() => handleConcluir(agendamento.id)}
                        >
                          Concluir
                        </button>
                      )}
                      <button
                        className="btn-cancelar"
                        onClick={() => handleCancelar(agendamento.id)}
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mensagem quando não há agendamentos */}
        {filtrarAgendamentos(agendamentos).length === 0 && (
          <p className="no-agendamentos">
            Nenhum agendamento {filtro !== 'todos' ? `${filtro} ` : ''}encontrado.
          </p>
        )}
      </div>
    </div>
  );
};

export default Agendamentos; 