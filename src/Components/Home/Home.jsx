import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import './Home.css';

/**
 * Componente Home - Página inicial do sistema
 * Apresenta uma landing page com informações sobre a barbearia
 */
function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

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
          <div className="service-card">
            <div className="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 20l4-16h2l4 16"></path>
                <path d="M17 4h1a2 2 0 0 1 2 2v1"></path>
                <path d="M7 4H6a2 2 0 0 0-2 2v1"></path>
                <line x1="12" y1="11" x2="12" y2="13"></line>
              </svg>
            </div>
            <h3>Corte de Cabelo</h3>
            <p>Cortes modernos e tradicionais para todos os estilos</p>
            <button className="service-button" onClick={() => navigate(user ? '/agendamentos' : '/login')}>
              Agendar
            </button>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6"></path>
                <path d="M3 11l9 9 9-9"></path>
              </svg>
            </div>
            <h3>Barba</h3>
            <p>Modelagem e aparação de barba com produtos premium</p>
            <button className="service-button" onClick={() => navigate(user ? '/agendamentos' : '/login')}>
              Agendar
            </button>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <h3>Tratamentos</h3>
            <p>Hidratação, relaxamento e outros cuidados especiais</p>
            <button className="service-button" onClick={() => navigate(user ? '/agendamentos' : '/login')}>
              Agendar
            </button>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Sobre Nós</h3>
            <p>Somos especialistas em cuidados masculinos, oferecendo serviços de alta qualidade em um ambiente acolhedor.</p>
          </div>
          <div className="footer-section">
            <h3>Horário de Funcionamento</h3>
            <p>Segunda a Sábado: 9h às 20h</p>
            <p>Domingo: Fechado</p>
          </div>
          <div className="footer-section">
            <h3>Contato</h3>
            <p>Telefone: (00) 0000-0000</p>
            <p>Email: contato@barbearia.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Barbearia Express. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home; 