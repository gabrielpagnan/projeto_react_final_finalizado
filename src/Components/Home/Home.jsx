import { FaUsers, FaCut, FaCalendarAlt, FaUserTie, FaStar, FaMapMarkerAlt, FaPhone, FaClock, FaInstagram, FaFacebook } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const [stats, setStats] = useState({
    agendamentos: 0,
    profissionais: 0,
    servicos: 0,
    usuarios: 0
  });

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
          <h1 className="hero-title">Barbearia Express</h1>
          <p className="hero-subtitle">Estilo e qualidade em cada corte</p>
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
          <button className="cta-button">Agendar Horário</button>
        </div>
        <div className="hero-image">
          <div className="barbershop-preview"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-header">
          <h2>Nossos Serviços</h2>
          <p>Oferecemos uma variedade de serviços para cuidar do seu visual</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <FaCut />
            </div>
            <h3>Corte Masculino</h3>
            <p>Corte tradicional masculino com acabamento perfeito</p>
            <span className="service-price">R$ 35</span>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <FaUserTie />
            </div>
            <h3>Barba</h3>
            <p>Fazer a barba com técnicas profissionais e produtos de qualidade</p>
            <span className="service-price">R$ 25</span>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <FaUsers />
            </div>
            <h3>Corte + Barba</h3>
            <p>Corte masculino + fazer a barba - combo completo</p>
            <span className="service-price">R$ 50</span>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <FaStar />
            </div>
            <h3>Hidratação</h3>
            <p>Hidratação capilar para cabelos saudáveis e brilhantes</p>
            <span className="service-price">R$ 40</span>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <FaStar />
            </div>
            <h3>Platinado</h3>
            <p>Descoloração do cabelo com técnica profissional</p>
            <span className="service-price">R$ 250</span>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-header">
          <h2>Nossa Equipe</h2>
          <p>Profissionais experientes e dedicados ao seu visual</p>
        </div>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-avatar">
              <FaUserTie />
            </div>
            <h3>Pedro Afonso</h3>
            <p className="team-specialty">Especialista em Corte Masculino</p>
            <div className="team-contact">
              <span>📞 (48) 98824-3105</span>
            </div>
            <div className="team-rating">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <span>5.0</span>
            </div>
          </div>
          <div className="team-card">
            <div className="team-avatar">
              <FaUserTie />
            </div>
            <h3>Gabriel Pagnan</h3>
            <p className="team-specialty">Especialista em Barba e Bigode</p>
            <div className="team-contact">
              <span>📞 (48) 99676-4308</span>
            </div>
            <div className="team-rating">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <span>5.0</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section">
        <div className="section-header">
          <h2>Por que escolher a Barbearia Express?</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaClock />
            </div>
            <h3>Horário Flexível</h3>
            <p>Atendimento de segunda a sábado, com horários que se adaptam à sua rotina</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaStar />
            </div>
            <h3>Qualidade Garantida</h3>
            <p>Produtos de primeira linha e técnicas atualizadas para o melhor resultado</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaUsers />
            </div>
            <h3>Ambiente Acolhedor</h3>
            <p>Local confortável e descontraído para você relaxar durante o atendimento</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaCalendarAlt />
            </div>
            <h3>Agendamento Online</h3>
            <p>Marque seu horário de forma rápida e prática através do nosso sistema</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Entre em Contato</h2>
            <p>Estamos aqui para atender você da melhor forma possível</p>
            <div className="contact-details">
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>Rua das Barbearias, 123 - Centro, Florianópolis/SC</span>
              </div>
              <div className="contact-item">
                <FaPhone />
                <span>(48) 3333-4444</span>
              </div>
              <div className="contact-item">
                <FaClock />
                <span>Segunda a Sexta: 9h às 18h | Sábado: 8h às 17h</span>
              </div>
            </div>
            <div className="social-media">
              <a href="#" className="social-link">
                <FaInstagram />
              </a>
              <a href="#" className="social-link">
                <FaFacebook />
              </a>
            </div>
          </div>
          <div className="contact-form">
            <h3>Envie uma Mensagem</h3>
            <form>
              <input type="text" placeholder="Seu nome" />
              <input type="email" placeholder="Seu email" />
              <textarea placeholder="Sua mensagem" rows="4"></textarea>
              <button type="submit">Enviar Mensagem</button>
            </form>
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