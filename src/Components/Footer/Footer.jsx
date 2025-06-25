import "./Footer.css";

/**
 * Componente Footer - Rodapé do site
 * Exibe informações de contato, links úteis e formulário de newsletter
 */
function Footer() {
  /**
   * Função para manipular o envio do formulário de newsletter
   * @param {Event} e - Evento do formulário
   */
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar lógica de inscrição na newsletter
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Grid de conteúdo do footer */}
        <div className="footer-content">
          {/* Seção Sobre */}
          <div className="footer-section">
            <h3>Sobre Nós</h3>
            <p>
              Somos uma barbearia moderna que combina tradição e inovação para 
              oferecer o melhor em serviços de beleza masculina.
            </p>
            {/* Links de redes sociais */}
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Seção Links Úteis */}
          <div className="footer-section">
            <h3>Links Úteis</h3>
            <ul>
              <li><a href="#" className="footer-link">Política de Privacidade</a></li>
              <li><a href="#" className="footer-link">Termos de Serviço</a></li>
              <li><a href="#" className="footer-link">FAQ</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
            </ul>
          </div>

          {/* Seção Contato */}
          <div className="footer-section">
            <h3>Contato</h3>
            <p>Rua das Palmeiras, 456</p>
            <p>Criciúma - SC</p>
            <p>Tel: (48) 99876-5432</p>
            <p>Email: contato@barbearia.com</p>
          </div>

          {/* Seção Newsletter */}
          <div className="footer-section">
            <h3>Newsletter</h3>
            <p>
              Inscreva-se para receber novidades, promoções e dicas de beleza.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                className="newsletter-input"
                placeholder="Seu e-mail"
                required
              />
              <button type="submit" className="newsletter-button">
                Inscrever
              </button>
            </form>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="footer-divider"></div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Barbearia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;