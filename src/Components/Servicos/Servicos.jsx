import "./Servicos.css";

function Servicos() {
  return (
    <div className="servicos">
      <h1>Serviços</h1>
      <p>Lista de serviços disponíveis no sistema</p>
      
      <div className="servicos-grid">
        <div className="servico-item">
          <h3>Serviço 1</h3>
          <p>Descrição do primeiro serviço</p>
          <span className="status ativo">Ativo</span>
        </div>
        <div className="servico-item">
          <h3>Serviço 2</h3>
          <p>Descrição do segundo serviço</p>
          <span className="status ativo">Ativo</span>
        </div>
        <div className="servico-item">
          <h3>Serviço 3</h3>
          <p>Descrição do terceiro serviço</p>
          <span className="status inativo">Inativo</span>
        </div>
      </div>
    </div>
  );
}

export default Servicos; 