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

----------------------------------------------------------------------
a) Aplicação React.js

O projeto foi criado usando React.js com Vite como bundler
Utiliza componentes funcionais e hooks modernos do React

b) Layout Responsivo

O projeto possui um design moderno e responsivo
Usa CSS modular para estilização
Adapta-se a diferentes tamanhos de tela (desktop, tablet e mobile)
Você pode ver isso no arquivo Layout.css que possui media queries para diferentes breakpoints

c) JSON Server

O projeto utiliza o JSON Server para simular uma API REST
Os dados são armazenados no arquivo data/db.json
Para iniciar o servidor JSON, você pode usar o comando npm run server
d) Requisições HTTP

As requisições são feitas através do serviço em src/services/api.js
Utiliza a biblioteca Axios para fazer as chamadas HTTP
Todas as operações CRUD são feitas através de requisições HTTP (GET, POST, PUT, DELETE)

e) Tratamento de Exceções
Todas as requisições HTTP estão envolvidas em blocos try/catch
Mensagens de erro são exibidas ao usuário quando algo dá errado
O sistema possui um componente de feedback visual para erros

f) Tela de Login

Localizada em src/Components/Login/Login.jsx
Possui validação de campos
Exibe mensagens de erro em caso de falha
Utiliza contexto de autenticação (src/contexts/auth.jsx)

g) CRUD de Serviços
Localizado em src/Components/Servicos/Servicos.jsx
Campos incluem:
Nome do serviço
Descrição
Preço
Duração
Categoria/Tipo

h) CRUD de Usuários

Localizado em src/Components/Usuarios/Usuarios.jsx
Campos incluem:
Nome
Email
Senha
Tipo (cliente/admin)
Telefone

i) Navbar e Footer Fixos

O Layout.jsx implementa o padrão SPA (Single Page Application)
Navbar (src/Components/Navbar/Navbar.jsx) e Footer (src/Components/Footer/Footer.jsx) são fixos
Apenas a tela de login não possui estes elementos
O layout é mantido consistente em todas as outras páginas

j) Navegação

Utiliza React Router DOM para gerenciamento de rotas
As rotas estão definidas em src/routes.jsx
A navegação pode ser feita através:
Menu na Navbar
Links internos
Botões de ação
Redirecionamentos após operações CRUD
O sistema também inclui recursos adicionais de segurança:
Proteção de rotas (ProtectedRoute.jsx e AdminRoute.jsx)
Autenticação persistente
Gerenciamento de sessão
Validação de formulários
Para executar o projeto:
npm install - Instala as dependências
npm run server - Inicia o JSON Server (em um terminal)
npm run dev - Inicia o servidor de desenvolvimento (em outro terminal)

