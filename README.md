# Barbearia Express - Sistema de Gestão

Um sistema completo para gestão de barbearias, desenvolvido em React com funcionalidades de agendamento, gestão de profissionais e serviços.

## 🚀 Funcionalidades

### 📅 Agendamentos
- Criar novos agendamentos
- Selecionar cliente, profissional e serviço
- Definir data e horário
- Adicionar observações
- Visualizar status dos agendamentos (pendente, confirmado, cancelado)

### 👨‍💼 Profissionais
- Cadastrar novos profissionais
- Definir especialidades
- Configurar horários de trabalho por dia da semana
- Editar e excluir profissionais
- Visualizar informações completas

### ✂️ Serviços
- Cadastrar serviços oferecidos
- Definir preços e durações
- Editar e excluir serviços
- Visualizar lista completa de serviços

### 👥 Usuários
- Gestão de clientes e administradores
- Controle de acesso baseado em tipo de usuário
- Sistema de login e registro

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **React Router DOM** - Roteamento
- **React Icons** - Ícones
- **JSON Server** - API REST simulada
- **Vite** - Build tool
- **CSS3** - Estilização

## 📦 Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd barbearia-express
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de dados (JSON Server):
```bash
npm run server
```

4. Em outro terminal, inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse o sistema em `http://localhost:5173`

## 🗄️ Estrutura de Dados

O sistema utiliza um banco de dados JSON com as seguintes entidades:

### Usuários
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456",
  "tipo": "cliente"
}
```

### Profissionais
```json
{
  "id": 1,
  "nome": "Carlos Barbosa",
  "especialidade": "Corte masculino",
  "telefone": "(11) 99999-9999",
  "email": "carlos@barbearia.com",
  "horarios": [
    {
      "dia": "segunda",
      "inicio": "09:00",
      "fim": "18:00"
    }
  ]
}
```

### Serviços
```json
{
  "id": 1,
  "nome": "Corte Masculino",
  "descricao": "Corte tradicional masculino",
  "preco": 35.00,
  "duracao": 30
}
```

### Agendamentos
```json
{
  "id": 1,
  "clienteId": 1,
  "profissionalId": 1,
  "servicoId": 1,
  "data": "2024-01-15",
  "horario": "14:00",
  "status": "confirmado",
  "observacoes": "Primeira vez"
}
```

## 🔐 Credenciais de Acesso

### Administrador
- Email: admin@barbearia.com
- Senha: admin123

### Cliente
- Email: joao@email.com
- Senha: 123456

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop
- Tablet
- Mobile

## 🎨 Design

- Interface moderna e intuitiva
- Gradientes e animações suaves
- Cards com efeitos hover
- Formulários modais
- Status coloridos para agendamentos

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run server` - Inicia o JSON Server
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa o linter

## 📋 Próximas Funcionalidades

- [ ] Relatórios e estatísticas
- [ ] Notificações por email/SMS
- [ ] Sistema de pagamentos
- [ ] Galeria de fotos dos trabalhos
- [ ] Avaliações e comentários
- [ ] Backup automático dos dados

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ para facilitar a gestão de barbearias.
