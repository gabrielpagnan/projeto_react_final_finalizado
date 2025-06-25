import { FaUsers, FaCut, FaCalendarAlt, FaUserTie, FaStar, FaMapMarkerAlt, FaPhone, FaClock, FaInstagram, FaFacebook } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from 'react-router-dom';

/**
 * Componente Home - Página inicial do sistema
 * Apresenta uma landing page com informações sobre a barbearia
 */
function Home() {
  const [stats, setStats] = useState({
    agendamentos: 0,
    profissionais: 0,
    servicos: 0,
    usuarios: 0
  });

  // Hook de navegação
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
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

      setStats({
        agendamentos: agendamentosData.length,
        profissionais: profissionaisData.length,
        servicos: servicosData.length,
        usuarios: usuariosData.filter(u => u.tipo === "cliente").length
      });
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Estilo e Tradição em Cada Corte
          </h1>
          <p className="hero-subtitle">
            Transforme seu visual com os melhores profissionais da cidade
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">{stats.profissionais}+</span>
              <span className="stat-label">Profissionais</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">{stats.servicos}+</span>
              <span className="stat-label">Serviços</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">{stats.usuarios}+</span>
              <span className="stat-label">Clientes Satisfeitos</span>
            </div>
          </div>
          <button 
            className="cta-button"
            onClick={() => navigate('/agendamentos/novo')}
          >
            Agende Agora
          </button>
        </div>
        <div className="hero-image">
          <div className="barbershop-preview"></div>
        </div>
      </section>

      {/* Seção de Destaques */}
      <section className="features-section">
        <h2 className="section-title">Por que nos escolher?</h2>
        <div className="features-grid">
          {/* Card de Profissionais */}
          <div className="feature-card">
            <i className="fas fa-cut"></i>
            <h3>Profissionais Experientes</h3>
            <p>
              Nossa equipe é formada por barbeiros altamente qualificados e 
              experientes no mercado.
            </p>
          </div>

          {/* Card de Ambiente */}
          <div className="feature-card">
            <i className="fas fa-home"></i>
            <h3>Ambiente Acolhedor</h3>
            <p>
              Um espaço moderno e confortável para você relaxar enquanto cuida 
              do visual.
            </p>
          </div>

          {/* Card de Produtos */}
          <div className="feature-card">
            <i className="fas fa-spray-can"></i>
            <h3>Produtos Premium</h3>
            <p>
              Utilizamos apenas produtos de alta qualidade para garantir os 
              melhores resultados.
            </p>
          </div>
        </div>
      </section>

      {/* Seção de Serviços */}
      <section className="services-section">
        <h2 className="section-title">Nossos Serviços</h2>
        <div className="services-grid">
          {/* Card de Corte */}
          <div className="service-card">
            <img 
              src="/images/corte.jpg" 
              alt="Corte de Cabelo"
              className="service-image"
            />
            <h3>Corte de Cabelo</h3>
            <p>
              Cortes modernos e clássicos para todos os estilos
            </p>
            <button 
              className="service-button"
              onClick={() => navigate('/servicos')}
            >
              Ver Mais
            </button>
          </div>

          {/* Card de Barba */}
          <div className="service-card">
            <img 
              src="/images/barba.jpg" 
              alt="Barba"
              className="service-image"
            />
            <h3>Barba</h3>
            <p>
              Modelagem e tratamento completo para sua barba
            </p>
            <button 
              className="service-button"
              onClick={() => navigate('/servicos')}
            >
              Ver Mais
            </button>
          </div>

          {/* Card de Tratamentos */}
          <div className="service-card">
            <img 
              src="/images/tratamento.jpg" 
              alt="Tratamentos"
              className="service-image"
            />
            <h3>Tratamentos</h3>
            <p>
              Hidratação, reconstrução e outros cuidados
            </p>
            <button 
              className="service-button"
              onClick={() => navigate('/servicos')}
            >
              Ver Mais
            </button>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section className="testimonials-section">
        <h2 className="section-title">O que dizem nossos clientes</h2>
        <div className="testimonials-grid">
          {/* Depoimento 1 */}
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "Excelente atendimento e profissionais muito capacitados. 
                Sempre saio satisfeito!"
              </p>
            </div>
            <div className="testimonial-author">
              <img 
                src="/images/client1.jpg" 
                alt="João Silva"
                className="author-image"
              />
              <div className="author-info">
                <h4>João Silva</h4>
                <div className="rating">★★★★★</div>
              </div>
            </div>
          </div>

          {/* Depoimento 2 */}
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "O ambiente é muito agradável e o resultado sempre supera 
                as expectativas!"
              </p>
            </div>
            <div className="testimonial-author">
              <img 
                src="/images/client2.jpg" 
                alt="Pedro Santos"
                className="author-image"
              />
              <div className="author-info">
                <h4>Pedro Santos</h4>
                <div className="rating">★★★★★</div>
              </div>
            </div>
          </div>

          {/* Depoimento 3 */}
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "Profissionais muito atenciosos e preços justos. 
                Recomendo a todos!"
              </p>
            </div>
            <div className="testimonial-author">
              <img 
                src="/images/client3.jpg" 
                alt="Lucas Oliveira"
                className="author-image"
              />
              <div className="author-info">
                <h4>Lucas Oliveira</h4>
                <div className="rating">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Contato */}
      <section className="contact-section">
        <div className="contact-content">
          <h2 className="section-title">Venha nos Conhecer</h2>
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <p>Rua Exemplo, 123 - Centro</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <p>(11) 1234-5678</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <p>Seg a Sáb: 9h às 20h</p>
            </div>
          </div>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Barbearia Express</h3>
            <p>Estilo e qualidade em cada corte. Sua barbearia de confiança em Florianópolis.</p>
          </div>
          <div className="footer-section">
            <h4>Serviços</h4>
            <ul>
              <li>Corte Masculino - R$ 35</li>
              <li>Barba - R$ 25</li>
              <li>Corte + Barba - R$ 50</li>
              <li>Hidratação - R$ 40</li>
              <li>Platinado - R$ 250</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Horário de Funcionamento</h4>
            <p>Segunda a Sexta: 9h às 18h</p>
            <p>Sábado: 8h às 17h</p>
            <p>Domingo: Fechado</p>
          </div>
          <div className="footer-section">
            <h4>Contato</h4>
            <p>📞 (48) 3333-4444</p>
            <p>📍 Rua das Barbearias, 123 - Centro</p>
            <p>📧 contato@barbearia.com</p>
            <p>🌐 Florianópolis/SC</p>
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