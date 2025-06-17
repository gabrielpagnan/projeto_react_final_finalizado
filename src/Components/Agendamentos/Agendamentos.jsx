import { useState, useEffect } from "react";
import "./Agendamentos.css";

function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [usuarioAtual, setUsuarioAtual] = useState(null);
  const [formData, setFormData] = useState({
    clienteId: "",
    profissionalId: "",
    servicoId: "",
    data: "",
    horario: "",
    observacoes: ""
  });

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioAtual") || "null");
    setUsuarioAtual(usuario);
    
    // Se for cliente, definir automaticamente o clienteId
    if (usuario && usuario.tipo === "cliente") {
      setFormData(prev => ({
        ...prev,
        clienteId: usuario.id
      }));
    }
  }, []);

  // Efeito separado para buscar dados após o usuário ser definido
  useEffect(() => {
    if (usuarioAtual) {
      fetchData();
    }
  }, [usuarioAtual]);

  const fetchData = async () => {
    try {
      const [agendamentosRes, profissionaisRes, servicosRes, usuariosRes] = await Promise.all([
        fetch("http://localhost:3000/agendamentos"),
        fetch("http://localhost:3000/profissionais"),
        fetch("http://localhost:3000/servicos"),
        fetch("http://localhost:3000/usuarios")
      ]);

      const [agendamentosData, profissionaisData, servicosData, usuariosData] = await Promise.all([
        agendamentosRes.json(),
        profissionaisRes.json(),
        servicosRes.json(),
        usuariosRes.json()
      ]);

      // Filtrar agendamentos baseado no tipo de usuário
      let agendamentosFiltrados = agendamentosData;
      if (usuarioAtual && usuarioAtual.tipo === "cliente") {
        agendamentosFiltrados = agendamentosData.filter(
          agendamento => String(agendamento.clienteId) === String(usuarioAtual.id)
        );
      }

      setAgendamentos(agendamentosFiltrados);
      setProfissionais(profissionaisData);
      setServicos(servicosData);
      setUsuarios(usuariosData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          status: "pendente"
        }),
      });

      if (response.ok) {
        setShowForm(false);
        setFormData({
          clienteId: usuarioAtual?.tipo === "cliente" ? usuarioAtual.id : "",
          profissionalId: "",
          servicoId: "",
          data: "",
          horario: "",
          observacoes: ""
        });
        fetchData();
      }
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getClienteNome = (clienteId) => {
    const cliente = usuarios.find(u => u.id === clienteId);
    return cliente ? cliente.nome : "N/A";
  };

  const getProfissionalNome = (profissionalId) => {
    const profissional = profissionais.find(p => p.id === profissionalId);
    return profissional ? profissional.nome : "N/A";
  };

  const getServicoNome = (servicoId) => {
    const servico = servicos.find(s => s.id === servicoId);
    return servico ? servico.nome : "N/A";
  };

  const getServicoPreco = (servicoId) => {
    const servico = servicos.find(s => s.id === servicoId);
    return servico ? `R$ ${servico.preco.toFixed(2)}` : "N/A";
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmado": return "green";
      case "pendente": return "orange";
      case "cancelado": return "red";
      default: return "gray";
    }
  };

  const handleStatusChange = async (agendamentoId, novoStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/agendamentos/${agendamentoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: novoStatus }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const handleConfirmarAgendamento = async (agendamentoId) => {
    try {
      const response = await fetch(`http://localhost:3000/agendamentos/${agendamentoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "confirmado" }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Erro ao confirmar agendamento:", error);
    }
  };

  const handleExcluirAgendamento = async (agendamentoId) => {
    if (!window.confirm("Tem certeza que deseja excluir este agendamento?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/agendamentos/${agendamentoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Erro ao excluir agendamento:", error);
    }
  };

  // Mostrar loading enquanto carrega
  if (!usuarioAtual) {
    return (
      <div className="agendamentos-container">
        <div className="loading">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="agendamentos-container">
      <div className="agendamentos-header">
        <h1>
          {usuarioAtual?.tipo === "cliente" ? "Meus Agendamentos" : "Agendamentos"}
        </h1>
        <button 
          className="btn-novo-agendamento"
          onClick={() => setShowForm(true)}
        >
          Novo Agendamento
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>Novo Agendamento</h2>
            <form onSubmit={handleSubmit}>
              {/* Campo cliente apenas para admins */}
              {usuarioAtual?.tipo === "admin" && (
                <div className="form-group">
                  <label>Cliente:</label>
                  <select 
                    name="clienteId" 
                    value={formData.clienteId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione um cliente</option>
                    {usuarios.filter(u => u.tipo === "cliente").map(cliente => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.nome}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label>Profissional:</label>
                <select 
                  name="profissionalId" 
                  value={formData.profissionalId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione um profissional</option>
                  {profissionais.map(profissional => (
                    <option key={profissional.id} value={profissional.id}>
                      {profissional.nome} - {profissional.especialidade}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Serviço:</label>
                <select 
                  name="servicoId" 
                  value={formData.servicoId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione um serviço</option>
                  {servicos.map(servico => (
                    <option key={servico.id} value={servico.id}>
                      {servico.nome} - R$ {servico.preco.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Data:</label>
                <input
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Horário:</label>
                <input
                  type="time"
                  name="horario"
                  value={formData.horario}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Observações:</label>
                <textarea
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="form-buttons">
                <button type="submit">Criar Agendamento</button>
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  className="btn-cancelar"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="agendamentos-grid">
        {agendamentos.length === 0 ? (
          <div className="no-agendamentos">
            <p>Nenhum agendamento encontrado.</p>
          </div>
        ) : (
          agendamentos.map((agendamento) => (
            <div key={agendamento.id} className="agendamento-card">
              <div className="agendamento-header">
                <h3>Agendamento #{agendamento.id}</h3>
                <span 
                  className={`status status-${getStatusColor(agendamento.status)}`}
                >
                  {agendamento.status}
                </span>
              </div>
              
              <div className="agendamento-info">
                <p><strong>Cliente:</strong> {getClienteNome(agendamento.clienteId)}</p>
                <p><strong>Profissional:</strong> {getProfissionalNome(agendamento.profissionalId)}</p>
                <p><strong>Serviço:</strong> {getServicoNome(agendamento.servicoId)}</p>
                <p><strong>Preço:</strong> {getServicoPreco(agendamento.servicoId)}</p>
                <p><strong>Data:</strong> {formatarData(agendamento.data)}</p>
                <p><strong>Horário:</strong> {agendamento.horario}</p>
                {agendamento.observacoes && (
                  <p><strong>Observações:</strong> {agendamento.observacoes}</p>
                )}
              </div>

              {/* Controles apenas para admins */}
              {usuarioAtual?.tipo === "admin" && (
                <div className="agendamento-actions">
                  <select
                    value={agendamento.status}
                    onChange={(e) => handleStatusChange(agendamento.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pendente">Pendente</option>
                    <option value="confirmado">Confirmado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                  
                  <div className="action-buttons">
                    {agendamento.status !== "confirmado" && (
                      <button
                        onClick={() => handleConfirmarAgendamento(agendamento.id)}
                        className="btn-confirmar"
                        title="Confirmar Agendamento"
                      >
                        ✓ Confirmar
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleExcluirAgendamento(agendamento.id)}
                      className="btn-excluir"
                      title="Excluir Agendamento"
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Agendamentos; 