import { FaUsers, FaCogs, FaChartBar } from "react-icons/fa";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Bem-vindo ao Sistema</h1>
      <p>Esta é a página inicial do seu sistema. Gerencie seus dados de forma eficiente e intuitiva.</p>
      <div className="dashboard-cards">
        <div className="card">
          <div className="card-icon">
            <FaUsers />
          </div>
          <h3>Usuários</h3>
          <p>Gerencie os usuários do sistema com facilidade. Visualize, edite e controle o acesso de todos os membros.</p>
        </div>
        <div className="card">
          <div className="card-icon">
            <FaCogs />
          </div>
          <h3>Serviços</h3>
          <p>Visualize e configure os serviços disponíveis. Monitore o status e performance de cada serviço.</p>
        </div>
        <div className="card">
          <div className="card-icon">
            <FaChartBar />
          </div>
          <h3>Relatórios</h3>
          <p>Acesse relatórios detalhados e estatísticas em tempo real. Tome decisões baseadas em dados precisos.</p>
        </div>
      </div>
    </div>
  );
}

export default Home; 