# 🚀 Guia de Deployment - GreenPoints+

## 📋 Visão Geral

Este guia explica como fazer deploy do:
- **Backend** no Render
- **Frontend** na Vercel

---

## 🔧 Backend - Render

### 1. Variáveis de Ambiente no Render

Aceda ao Dashboard do Render → Seu Serviço → Environment

Configure as seguintes variáveis:

```
NODE_ENV=production
PORT=5000
MONGO_URL=mongodb+srv://seu-usuario:senha@cluster.mongodb.net/greenpoints
JWT_SECRET=sua_chave_secreta_muito_segura_aqui
CLIENT_ORIGIN=https://seu-frontend.vercel.app
```

**⚠️ IMPORTANTE:**
- `CLIENT_ORIGIN` deve ser o URL exato da sua aplicação na Vercel (sem `/` no final)
- Exemplo: `https://greenpoints-frontend.vercel.app`
- Isso é crítico para o CORS e WebSocket funcionarem

### 2. Configurações do Render

- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Node Version**: 18.x ou superior
- **Auto-Deploy**: Ativado (recomendado)

### 3. Verificar Deploy

Após o deploy, teste:
```bash
curl https://seu-backend.onrender.com/api
```

Deve retornar: `{"message":"GreenPoints+ API"}`

---

## 🎨 Frontend - Vercel

### 1. Variáveis de Ambiente na Vercel

Aceda ao Dashboard da Vercel → Seu Projeto → Settings → Environment Variables

Configure:

```
VITE_API_BASE=https://seu-backend.onrender.com/api
```

**⚠️ IMPORTANTE:**
- Use o URL completo do seu backend no Render
- Inclua `/api` no final
- Exemplo: `https://greenpoints-backend.onrender.com/api`

### 2. Configurações da Vercel

A Vercel detecta automaticamente projetos Vite. Verifique se:

- **Framework Preset**: Vite
- **Root Directory**: `frontend` (se necessário)
- **Build Command**: `npm run build` (automático)
- **Output Directory**: `dist` (automático)
- **Install Command**: `npm install` (automático)

### 3. Redesploy Após Mudanças

Sempre que alterar variáveis de ambiente:
1. Vá em Deployments
2. Clique nos 3 pontos do último deploy
3. Selecione "Redeploy"

---

## 🔌 Solução de Problemas - WebSocket

### Erro: "WebSocket connection to 'ws://localhost:5001' failed"

**Causa**: Variáveis de ambiente não configuradas corretamente.

**Solução**:

1. **Na Vercel**, confirme que `VITE_API_BASE` está definido:
   ```
   VITE_API_BASE=https://seu-backend.onrender.com/api
   ```

2. **No Render**, confirme que `CLIENT_ORIGIN` está definido:
   ```
   CLIENT_ORIGIN=https://seu-frontend.vercel.app
   ```

3. **Redesploy** ambos os serviços após alterar variáveis

### Verificar Conexão WebSocket

Abra o Console do navegador (F12) e procure por:

✅ **Sucesso**:
```
✅ Conectado ao Socket.IO: abc123xyz
📅 Dica do dia recebida: [título da dica]
```

❌ **Erro**:
```
WebSocket connection failed
```

### Testar Backend Localmente

```bash
cd backend
npm install
# Criar arquivo .env com suas variáveis
npm run dev
```

### Testar Frontend Localmente

```bash
cd frontend
npm install
# Criar arquivo .env.local
echo "VITE_API_BASE=http://localhost:5001/api" > .env.local
npm run dev
```

---

## 🔐 Segurança

### Variáveis que NUNCA devem ser commitadas:

- ❌ `.env`
- ❌ `.env.local`
- ❌ `.env.production`
- ✅ `.env.example` (pode commitar)

### Gerar JWT_SECRET seguro:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 📊 MongoDB Atlas

### Configurar Acesso

1. Vá em **Network Access** no MongoDB Atlas
2. Adicione o IP `0.0.0.0/0` (permitir todos) para ambientes de produção dinâmicos como Render
3. Ou use a opção "Add Current IP Address" e adicione os IPs do Render

### String de Conexão

Formato:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

---

## 🔄 Fluxo de Deploy

### Desenvolvimento → Produção

1. **Commit** suas mudanças no Git
2. **Push** para GitHub/GitLab
3. **Render** faz auto-deploy do backend
4. **Vercel** faz auto-deploy do frontend
5. **Verificar** logs em ambas as plataformas

### Logs

**Render**: Dashboard → Logs (real-time)
**Vercel**: Dashboard → Deployments → View Function Logs

---

## 📱 URLs de Exemplo

**Backend (Render)**:
- API: `https://greenpoints-backend.onrender.com/api`
- WebSocket: `wss://greenpoints-backend.onrender.com`

**Frontend (Vercel)**:
- App: `https://greenpoints-frontend.vercel.app`

---

## ✅ Checklist de Deploy

### Backend (Render)
- [ ] Variáveis de ambiente configuradas
- [ ] `CLIENT_ORIGIN` aponta para URL da Vercel
- [ ] MongoDB Atlas permite conexões do Render
- [ ] Deploy concluído sem erros
- [ ] Endpoint `/api` responde

### Frontend (Vercel)
- [ ] Variável `VITE_API_BASE` configurada
- [ ] Aponta para URL do Render com `/api`
- [ ] Deploy concluído sem erros
- [ ] App carrega sem erros de CORS
- [ ] WebSocket conecta (verificar no Console)

---

## 🆘 Suporte

Se os problemas persistirem:

1. Verifique os logs no Render e Vercel
2. Teste as URLs manualmente no navegador
3. Use as DevTools (F12) → Console para ver erros
4. Verifique se ambos os serviços estão "running"

---

## 🔄 Atualizações Futuras

Para adicionar novas variáveis de ambiente:

1. Adicione em `.env.example` (documentação)
2. Configure no Render/Vercel
3. Redesploy os serviços
4. Atualize este guia se necessário