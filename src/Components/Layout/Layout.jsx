// Importação das dependências necessárias
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.css';

/**
 * Componente Layout - Estrutura base do aplicativo
 * Define o layout padrão com navbar, conteúdo principal e footer
 */
const Layout = () => {
  return (
    <div className="layout">
      {/* Barra de navegação fixa no topo */}
      <Navbar />

      {/* Conteúdo principal - renderiza as rotas filhas */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Rodapé fixo na base */}
      <Footer />
    </div>
  );
};

export default Layout; 