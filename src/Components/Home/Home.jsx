import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import './Home.css';
import { useState, useEffect } from 'react';
import api from '../../services/api';

/**
 * Componente Home - Página inicial do sistema
 * Apresenta uma landing page com informações sobre a barbearia
 */
function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await api.get('/servicos');
        setServicos(response.data);
      } catch (err) {
        setServicos([]);
      }
    };
    fetchServicos();
  }, []);

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Barbearia Express</h1>
          <p className="hero-subtitle">Agende seu horário com os melhores profissionais</p>
          
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">0+</span>
              <span className="stat-label">Profissionais</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">0+</span>
              <span className="stat-label">Serviços</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">0+</span>
              <span className="stat-label">Clientes</span>
            </div>
          </div>

          <button 
            className="cta-button"
            onClick={() => navigate(user ? '/agendamentos' : '/login')}
          >
            {user ? 'Agendar Agora' : 'Fazer Login'}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </section>

      <section className="services-section">
        <h2 className="section-title">Nossos Serviços</h2>
        <div className="services-grid">
          {servicos.length === 0 ? (
            <p>Nenhum serviço encontrado.</p>
          ) : (
            servicos.map(servico => (
              <div key={servico.id} className="service-card">
                <div className="service-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </div>
                <h3>{servico.nome}</h3>
                <p>{servico.descricao}</p>
                <button className="service-button" onClick={() => navigate(user ? '/agendamentos' : '/login')}>
                  Agendar
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Home; 