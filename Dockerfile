# Usa a versão do Node.js que você está utilizando
FROM node:22.14.0

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json para o container
COPY package*.json ./

# Instala as dependências usando npm
RUN npm install

# Copia o restante do código para o container
COPY . .

# Expõe a porta padrão da API (ajuste se necessário)
EXPOSE 3002

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
