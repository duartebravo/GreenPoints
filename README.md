# 🌱 GreenPoints+

**Projeto desenvolvido no âmbito da unidade curricular**  
**Sistemas de Informação em Rede (SIR) – 2025/2026**  
**ESTG – Instituto Politécnico de Viana do Castelo**

---

## 📌 Descrição do Projeto

**GreenPoints+** é uma aplicação web gamificada que promove comportamentos sustentáveis através de um sistema de pontos, desafios semanais, badges e ranking global.

Os utilizadores podem registar ações ecológicas do dia a dia, acompanhar o seu progresso, comparar resultados com outros utilizadores e receber recompensas simbólicas, incentivando a adoção de hábitos mais sustentáveis na comunidade académica.

O projeto foi desenvolvido com base na identificação de uma **necessidade real**: motivar estudantes a adotarem práticas sustentáveis de forma contínua e envolvente, utilizando mecanismos de colaboração e gamificação.

---

## 🎯 Objetivos

- Incentivar práticas sustentáveis no quotidiano
- Promover a participação ativa e colaborativa dos utilizadores
- Utilizar gamificação como fator motivacional
- Explorar comunicação em tempo real em aplicações web
- Aplicar conceitos de APIs RESTful e bases de dados não relacionais

---

## 👥 Público-alvo

- Estudantes do ensino superior
- Comunidade académica
- Utilizadores interessados em sustentabilidade e impacto ambiental

---

## 🚀 Funcionalidades Principais

### 🔐 Sistema de Autenticação
- Registo e login de utilizadores apenas email institucional.

### 🌍 Registo de Ações Sustentáveis
- Ações organizadas por categorias (Transporte, Alimentação, Reciclagem, Energia, Água)
- Atribuição automática de pontos

### 🎯 Desafios Semanais
- Desafios gerados automaticamente
- Controlo de progresso por utilizador

### 🏅 Sistema de Badges
- Conquistas desbloqueáveis de forma automática
- Diferentes níveis de progresso

### 🏆 Ranking Global
- Leaderboard com os utilizadores mais ativos
- Atualização em tempo real

### 💡 Dicas de Sustentabilidade
- Dicas diárias e por categoria

### ⚡ Comunicação em Tempo Real
- Atualizações de ranking e eventos via Socket.IO

---

## 🧱 Arquitetura do Sistema

A aplicação segue uma **arquitetura cliente-servidor**, com separação clara entre frontend e backend.

### Backend
- Node.js + Express.js
- API RESTful
- MongoDB (base de dados não relacional)
- Socket.IO para comunicação em tempo real
- Autenticação com JWT

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Context API
- Integração com Socket.IO

---

## 🛠 Tecnologias Utilizadas

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** com Mongoose
- **JWT** – autenticação
- **Socket.IO** – comunicação em tempo real
- **bcryptjs** – encriptação de passwords

### Frontend
- **React**
- **TypeScript**
- **Vite**
- **React Router**
- **Tailwind CSS**
- **Radix UI**
- **socket.io-client**

---

## 📂 Estrutura do Projeto

```
GreenPoints/
├── backend/
│   ├── src/
│   │   ├── config/           # Configurações (DB, seeds, desafios, dicas)
│   │   ├── controllers/      # Lógica de negócio
│   │   ├── middleware/       # Autenticação e permissões
│   │   ├── models/           # Modelos Mongoose
│   │   ├── routes/           # Endpoints da API
│   │   ├── utils/            # Funções auxiliares
│   │   └── server.js         # Ponto de entrada do backend
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── contexts/         # Contextos globais
│   │   ├── hooks/            # Hooks personalizados
│   │   ├── lib/              # Utilitários e serviços
│   │   ├── pages/            # Páginas da aplicação
│   │   └── App.tsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Instalação e Execução

### Pré-requisitos
- Node.js (v18 ou superior)
- MongoDB (local ou MongoDB Atlas)
- npm

### ▶ Backend

1. Aceder à pasta do backend:
```bash
cd backend
```

2. Instalar dependências:
```bash
npm install
```

3. Criar ficheiro `.env` com base em `.env.example`:
```env
MONGODB_URI=mongodb://localhost:27017/greenpoints
JWT_SECRET=your_secret_key_here
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

4. Iniciar o servidor:
```bash
npm run dev
```

**Servidor disponível em:** `http://localhost:5001`

### ▶ Frontend

1. Aceder à pasta do frontend:
```bash
cd frontend
```

2. Instalar dependências:
```bash
npm install
```

3. Criar ficheiro `.env`:
```env
VITE_API_URL=http://localhost:5000
```

4. Iniciar a aplicação:
```bash
npm run dev
```

**Aplicação disponível em:** `http://localhost:5173`

---

## 🔗 API Endpoints Principais

### Autenticação
- `POST /api/auth/register` – Registo de utilizador
- `POST /api/auth/login` – Login
- `GET /api/auth/profile` – Perfil do utilizador (protegido)

### Ações Sustentáveis
- `POST /api/actions/register` – Registar ação
- `GET /api/actions/history` – Histórico de ações do utilizador

### Desafios
- `GET /api/challenges/weekly` – Desafios da semana

### Ranking
- `GET /api/rankings/top` – Top utilizadores
- `GET /api/rankings/user/:userId` – Posição do utilizador

---

## 🤖 Uso de Inteligência Artificial no Desenvolvimento

Durante o desenvolvimento do projeto **GreenPoints+**, foram utilizadas ferramentas de **Inteligência Artificial** (nomeadamente **ChatGPT**) como apoio técnico, em conformidade com as regras definidas no enunciado da unidade curricular.

### Como foi utilizada
- Apoio na estruturação inicial do backend e frontend
- Sugestões para lógica de desafios, badges e ranking
- Apoio na resolução de erros e debugging
- Ajuda na organização e documentação do projeto

### Como foi adaptado
Todo o código gerado foi **revisto, compreendido, testado e adaptado manualmente**, sendo realizadas alterações significativas para adequar a solução ao contexto do projeto e aos seus objetivos.

### Reflexão
A IA revelou-se uma ferramenta útil para **acelerar o desenvolvimento** e apoiar a aprendizagem, mas **não substituiu o processo de análise, decisão e implementação** por parte do autor. A compreensão do código e a sua adaptação ao contexto específico do projeto foram essenciais para garantir a qualidade da solução final.

---
## DEPLOY VERCEL.COM
https://green-points-nu.vercel.app/


---

## 👨‍🎓 Membros do Grupo

**Duarte Bravo** – nº 31385
**Pedro Morais** – nº 31391
**João Salgado** – nº 29109


---

## 📚 Unidade Curricular

**Sistemas de Informação em Rede – 2025/2026**  
Licenciatura em Engenharia Informática  
ESTG – Instituto Politécnico de Viana do Castelo  
**Docente:** Pedro Moreira
