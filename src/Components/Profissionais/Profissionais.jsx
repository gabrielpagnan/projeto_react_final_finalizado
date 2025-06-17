import { useState, useEffect } from "react";
import "./Profissionais.css";

function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    especialidade: "",
    telefone: "",
    email: "",
    horarios: [
      { dia: "segunda", inicio: "09:00", fim: "18:00", ativo: true },
      { dia: "terca", inicio: "09:00", fim: "18:00", ativo: true },
      { dia: "quarta", inicio: "09:00", fim: "18:00", ativo: true },
      { dia: "quinta", inicio: "09:00", fim: "18:00", ativo: true },
      { dia: "sexta", inicio: "09:00", fim: "18:00", ativo: true },
      { dia: "sabado", inicio: "08:00", fim: "17:00", ativo: true },
      { dia: "domingo", inicio: "00:00", fim: "00:00", ativo: false }
    ]
  });

  const diasSemana = [
    { key: "segunda", label: "Segunda-feira" },
    { key: "terca", label: "Terça-feira" },
    { key: "quarta", label: "Quarta-feira" },
    { key: "quinta", label: "Quinta-feira" },
    { key: "sexta", label: "Sexta-feira" },
    { key: "sabado", label: "Sábado" },
    { key: "domingo", label: "Domingo" }
  ];

  useEffect(() => {
    fetchProfissionais();
  }, []);

  const fetchProfissionais = async () => {
    try {
      const response = await fetch("http://localhost:3000/profissionais");
      const data = await response.json();
      setProfissionais(data);
    } catch (error) {
      console.error("Erro ao carregar profissionais:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId 
        ? `http://localhost:3000/profissionais/${editingId}`
        : "http://localhost:3000/profissionais";
      
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
        fetchProfissionais();
      }
    } catch (error) {
      console.error("Erro ao salvar profissional:", error);
    }
  };

  const handleEdit = (profissional) => {
    setFormData({
      nome: profissional.nome,
      especialidade: profissional.especialidade,
      telefone: profissional.telefone,
      email: profissional.email,
      horarios: profissional.horarios.map(h => ({ ...h, ativo: true }))
    });
    setEditingId(profissional.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este profissional?")) {
      try {
        const response = await fetch(`http://localhost:3000/profissionais/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchProfissionais();
        }
      } catch (error) {
        console.error("Erro ao excluir profissional:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleHorarioChange = (index, field, value) => {
    const newHorarios = [...formData.horarios];
    newHorarios[index] = {
      ...newHorarios[index],
      [field]: value
    };
    setFormData({
      ...formData,
      horarios: newHorarios
    });
  };

  const toggleDiaAtivo = (index) => {
    const newHorarios = [...formData.horarios];
    newHorarios[index] = {
      ...newHorarios[index],
      ativo: !newHorarios[index].ativo
    };
    setFormData({
      ...formData,
      horarios: newHorarios
    });
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      especialidade: "",
      telefone: "",
      email: "",
      horarios: [
        { dia: "segunda", inicio: "09:00", fim: "18:00", ativo: true },
        { dia: "terca", inicio: "09:00", fim: "18:00", ativo: true },
        { dia: "quarta", inicio: "09:00", fim: "18:00", ativo: true },
        { dia: "quinta", inicio: "09:00", fim: "18:00", ativo: true },
        { dia: "sexta", inicio: "09:00", fim: "18:00", ativo: true },
        { dia: "sabado", inicio: "08:00", fim: "17:00", ativo: true },
        { dia: "domingo", inicio: "00:00", fim: "00:00", ativo: false }
      ]
    });
  };

  const formatarHorario = (horario) => {
    if (horario === "00:00") return "Fechado";
    return horario;
  };

  return (
    <div className="profissionais-container">
      <div className="profissionais-header">
        <h1>Profissionais</h1>
        <button 
          className="btn-novo-profissional"
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            resetForm();
          }}
        >
          Novo Profissional
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>{editingId ? "Editar Profissional" : "Novo Profissional"}</h2>
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
                <label>Especialidade:</label>
                <input
                  type="text"
                  name="especialidade"
                  value={formData.especialidade}
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
                <label>Horários de Trabalho:</label>
                <div className="horarios-container">
                  {formData.horarios.map((horario, index) => (
                    <div key={horario.dia} className="horario-item">
                      <div className="horario-header">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={horario.ativo}
                            onChange={() => toggleDiaAtivo(index)}
                          />
                          <span className="checkmark"></span>
                          {diasSemana.find(d => d.key === horario.dia)?.label}
                        </label>
                      </div>
                      {horario.ativo && (
                        <div className="horario-times">
                          <input
                            type="time"
                            value={horario.inicio}
                            onChange={(e) => handleHorarioChange(index, "inicio", e.target.value)}
                          />
                          <span>até</span>
                          <input
                            type="time"
                            value={horario.fim}
                            onChange={(e) => handleHorarioChange(index, "fim", e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  ))}
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

      <div className="profissionais-list">
        {profissionais.length === 0 ? (
          <p className="no-profissionais">Nenhum profissional encontrado.</p>
        ) : (
          <div className="profissionais-grid">
            {profissionais.map((profissional) => (
              <div key={profissional.id} className="profissional-card">
                <div className="profissional-header">
                  <h3>{profissional.nome}</h3>
                  <div className="profissional-actions">
                    <button 
                      className="btn-editar"
                      onClick={() => handleEdit(profissional)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn-excluir"
                      onClick={() => handleDelete(profissional.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
                <div className="profissional-info">
                  <p><strong>Especialidade:</strong> {profissional.especialidade}</p>
                  <p><strong>Telefone:</strong> {profissional.telefone}</p>
                  <p><strong>Email:</strong> {profissional.email}</p>
                </div>
                <div className="profissional-horarios">
                  <h4>Horários de Trabalho:</h4>
                  <div className="horarios-list">
                    {profissional.horarios.map((horario) => (
                      <div key={horario.dia} className="horario-display">
                        <span className="dia">
                          {diasSemana.find(d => d.key === horario.dia)?.label}:
                        </span>
                        <span className="horario">
                          {formatarHorario(horario.inicio)} - {formatarHorario(horario.fim)}
                        </span>
                      </div>
                    ))}
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

export default Profissionais; 