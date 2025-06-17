import { useState, useEffect } from "react";
import "./Usuarios.css";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Carregar usuários do localStorage
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const admin = {
      id: 0,
      nome: "Administrador",
      email: "admin",
      cpf: "000.000.000-00",
      telefone: "(00) 00000-0000",
      perfil: "Administrador",
      status: "Ativo"
    };
    
    // Adicionar admin à lista se não existir
    const todosUsuarios = [admin, ...usuariosRegistrados.map(u => ({
      ...u,
      perfil: "Usuário",
      status: "Ativo"
    }))];
    
    setUsuarios(todosUsuarios);
  }, []);

  const handleDelete = (id) => {
    if (id === 0) {
      alert("Não é possível excluir o administrador!");
      return;
    }
    
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      const usuariosAtualizados = usuarios.filter(u => u.id !== id);
      setUsuarios(usuariosAtualizados);
      
      // Atualizar localStorage
      const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios") || "[]");
      const novosUsuarios = usuariosRegistrados.filter(u => u.id !== id);
      localStorage.setItem("usuarios", JSON.stringify(novosUsuarios));
    }
  };

  return (
    <div className="usuarios">
      <h1>Usuários</h1>
      <p>Gerenciamento de usuários do sistema</p>
      
      <div className="usuarios-table">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Perfil</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.cpf}</td>
                <td>{usuario.telefone}</td>
                <td>{usuario.perfil}</td>
                <td><span className="status ativo">{usuario.status}</span></td>
                <td>
                  <button className="btn-edit">Editar</button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(usuario.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuarios; 