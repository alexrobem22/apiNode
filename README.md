# API Node.js com Docker

API REST desenvolvida com Node.js, Express e Sequelize, utilizando MySQL como banco de dados.

## 🚀 Como iniciar o projeto

### Pré-requisitos
- Docker
- Docker Compose

### 1. Configurar variáveis de ambiente

Copie o arquivo `.env-Exemplo` para `.env` e configure as variáveis:

```bash
cp .env-Exemplo .env
```

Certifique-se de que as configurações do banco de dados no `.env` estejam corretas:
```
DATABASE=seu_database
DATABASE_HOST=apiNodeBd
DATABASE_PORT=3306
DATABASE_USERNAME=alex
DATABASE_PASSWORD=root
```

### 2. Iniciar os containers

```bash
docker compose up -d
```

Este comando irá:
- Criar o container do MySQL (`apiNodeBd`) na porta 3308
- Criar o container da aplicação Node.js (`nodeapi`) na porta 3001
- Instalar todas as dependências automaticamente

### 3. Verificar se os containers estão rodando

```bash
docker ps
```

Você deve ver os containers `nodeapi` e `apiNodeBd` em execução.

## 🐳 Como entrar no container

Para acessar o terminal do container da aplicação:

```bash
docker exec -it nodeapi bash
```

Para sair do container, digite:
```bash
exit
```

## 📊 Executar Migrations e Seeds

### Opção 1: Executando de fora do container (recomendado)

**Criar migration:**
```bash
docker exec -it nodeapi npx sequelize migration:generate --name=nome-da-migration
```

**Executar todas as migrations:**
```bash
docker exec -it nodeapi npx sequelize db:migrate
```

**Desfazer última migration:**
```bash
docker exec -it nodeapi npx sequelize db:migrate:undo
```

**Criar seed:**
```bash
docker exec -it nodeapi npx sequelize seed:generate --name=nome-do-seed
```

**Executar todos os seeds:**
```bash
docker exec -it nodeapi npx sequelize db:seed:all
```

**Desfazer todos os seeds:**
```bash
docker exec -it nodeapi npx sequelize db:seed:undo:all
```

### Opção 2: Executando dentro do container

Entre no container:
```bash
docker exec -it nodeapi bash
```

Depois execute os comandos:
```bash
# Executar migrations
npx sequelize db:migrate

# Executar seeds
npx sequelize db:seed:all

# Criar nova migration
npx sequelize migration:generate --name=nome-da-migration

# Criar novo seed
npx sequelize seed:generate --name=nome-do-seed
```

## 📝 Comandos úteis

### Gerenciar containers

**Parar os containers:**
```bash
docker-compose down
```

**Parar e remover volumes (apaga o banco de dados):**
```bash
docker-compose down -v
```

**Reiniciar os containers:**
```bash
docker-compose restart
```

**Ver logs da aplicação:**
```bash
docker logs nodeapi -f
```

**Ver logs do banco de dados:**
```bash
docker logs apiNodeBd -f
```

### Reconstruir a aplicação

Se você modificar o Dockerfile ou package.json:
```bash
docker-compose up -d --build
```

## 🔧 Acessar o banco de dados

**Conectar ao MySQL de fora do container:**
- Host: `localhost`
- Porta: `3308`
- Usuário: `alex`
- Senha: `root`

**Conectar ao MySQL dentro do container:**
```bash
docker exec -it apiNodeBd mysql -u alex -p
```

## 🌐 Acessar a aplicação

A API estará disponível em: `http://localhost:3001`

## 📦 Estrutura do projeto

```
.
├── src/
│   ├── config/          # Configurações (database, etc)
│   ├── controllers/     # Controladores da aplicação
│   ├── database/
│   │   ├── migrations/  # Migrations do banco
│   │   └── seeds/       # Seeds do banco
│   ├── middlewares/     # Middlewares (autenticação, etc)
│   ├── models/          # Models do Sequelize
│   └── routes/          # Rotas da API
├── .env                 # Variáveis de ambiente
├── docker-compose.yml   # Configuração do Docker Compose
├── Dockerfile           # Configuração da imagem Docker
└── server.js            # Arquivo principal
```

## 🛠️ Tecnologias utilizadas

- Node.js
- Express
- Sequelize
- MySQL
- Docker
- JWT (autenticação)
- Bcrypt (criptografia de senhas)
