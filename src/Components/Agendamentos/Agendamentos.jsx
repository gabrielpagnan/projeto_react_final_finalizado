import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';
import "./Agendamentos.css";

/**
 * Componente Agendamentos - Página de gerenciamento de agendamentos
 * Permite visualizar, criar, editar e cancelar agendamentos
 */
const Agendamentos = () => {
  // Hook de navegação para redirecionamento de páginas
  const navigate = useNavigate();
  // Recupera o usuário logado do contexto de autenticação
  const { user } = useContext(AuthContext);

  // Estado para armazenar a lista de agendamentos
  const [agendamentos, setAgendamentos] = useState([]);
  // Estado para armazenar a lista de serviços (não usado diretamente, mas pode ser útil)
  const [_servicos, setServicos] = useState([]);
  // Estado para armazenar a lista de profissionais (não usado diretamente, mas pode ser útil)
  const [_profissionais, setProfissionais] = useState([]);
  // Estado de carregamento da página
  const [loading, setLoading] = useState(true);
  // Estado de erro para exibir mensagens de erro
  const [error, setError] = useState(null);
  // Estado para o filtro de status dos agendamentos
  const [filtro, setFiltro] = useState('todos');

  /**
   * Efeito para carregar os agendamentos ao montar o componente
   * Faz a requisição à API e atualiza o estado
   */
  useEffect(() => {
    // Função assíncrona para buscar dados
    const fetchData = async () => {
      try {
        setLoading(true); // Inicia o carregamento
        // Busca todos os dados necessários em paralelo
        const [agendamentosRes, servicosRes, profissionaisRes, usuariosRes] = await Promise.all([
          api.get('/agendamentos'), // Busca agendamentos
          api.get('/servicos'),     // Busca serviços
          api.get('/profissionais'),// Busca profissionais
          api.get('/usuarios')      // Busca usuários
        ]);
        // Cria mapas para busca rápida de serviços, profissionais e usuários
        const servicosMap = new Map(servicosRes.data.map(s => [s.id, s]));
        const profissionaisMap = new Map(profissionaisRes.data.map(p => [p.id, p]));
        const usuariosMap = new Map(usuariosRes.data.map(u => [u.id, u]));
        // Enriquecer os agendamentos com dados relacionados (serviço, profissional, cliente)
        const agendamentosEnriquecidos = agendamentosRes.data.map(ag => ({
          ...ag,
          servico: servicosMap.get(ag.servicoId) || { nome: 'Serviço não encontrado' },
          profissional: profissionaisMap.get(ag.profissionalId) || { nome: 'Profissional não encontrado' },
          clienteNome: usuariosMap.get(ag.clienteId)?.nome || ''
        }));
        // Filtra os agendamentos do usuário logado se não for admin
        let agendamentosFiltrados = agendamentosEnriquecidos;
        if (user && user.tipo !== 'admin') {
          agendamentosFiltrados = agendamentosEnriquecidos.filter(ag => ag.clienteId === user.id);
        }
        // Atualiza os estados com os dados carregados
        setAgendamentos(agendamentosFiltrados);
        setServicos(servicosRes.data);
        setProfissionais(profissionaisRes.data);
        setError(null); // Limpa erro
      } catch (err) {
        // Em caso de erro, exibe mensagem
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar os dados. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false); // Finaliza carregamento
      }
    };
    // Chama a função de busca de dados
    fetchData();
  }, [user]); // Executa sempre que o usuário mudar

  /**
   * Função para formatar data e hora
   * @param {string} data - String de data no formato ISO
   * @returns {string} Data formatada
   */
  const formatarData = (data) => {
    try {
      return new Date(data).toLocaleDateString('pt-BR');
    } catch (err) {
      return 'Data inválida';
    }
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
   * Função para excluir um agendamento
   * @param {number} id - ID do agendamento a ser excluído
   */
  const handleExcluir = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento? Esta ação não poderá ser desfeita.')) {
      try {
        await api.delete(`/agendamentos/${id}`);
        setAgendamentos(prev => prev.filter(ag => ag.id !== id));
      } catch (err) {
        console.error('Erro ao excluir agendamento:', err);
        alert('Erro ao excluir agendamento. Tente novamente.');
      }
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

  // Função para obter texto e classe do status
  const getStatusInfo = (status) => {
    switch (status) {
      case 'concluido':
        return { text: 'Concluído', className: 'status status-concluido' };
      case 'cancelado':
        return { text: 'Cancelado', className: 'status status-cancelado' };
      case 'pendente':
      default:
        return { text: 'Pendente', className: 'status status-pendente' };
    }
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

  // Renderização principal do componente
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
        {agendamentos.length === 0 ? (
          <div className="no-data-message">
            Nenhum agendamento encontrado.
          </div>
        ) : (
          <table className="agendamentos-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Horário</th>
                <th>Serviço</th>
                <th>Profissional</th>
                <th>Cliente</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrarAgendamentos(agendamentos).map((agendamento) => (
                <tr key={agendamento.id}>
                  <td>{formatarData(agendamento.data)}</td>
                  <td>{agendamento.horario || 'Não definido'}</td>
                  <td>{agendamento.servico?.nome || 'Serviço não encontrado'}</td>
                  <td>{agendamento.profissional?.nome || 'Profissional não encontrado'}</td>
                  <td>{agendamento.clienteNome || agendamento.clienteId || '-'}</td>
                  <td>
                    <span className={getStatusInfo(agendamento.status).className}>
                      {getStatusInfo(agendamento.status).text}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {(agendamento.status === 'pendente' || !agendamento.status) && (
                        <>
                          {user?.tipo === 'admin' && (
                            <button
                              className="btn-concluir btn-action"
                              onClick={() => handleConcluir(agendamento.id)}
                            >
                              Concluir
                            </button>
                          )}
                          <button
                            className="btn-cancelar btn-action"
                            onClick={() => handleCancelar(agendamento.id)}
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                      {user?.tipo === 'admin' && (
                        <button
                          className="btn-excluir btn-action"
                          onClick={() => handleExcluir(agendamento.id)}
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Exporta o componente para uso em outras partes do sistema
export default Agendamentos; 