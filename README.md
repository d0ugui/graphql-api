## 📖 Projeto

O projeto consiste em uma API desenvolvida em GraphQL, integrada ao Mongoose. O banco de dados foi virtualizado utilizando o Docker. A aplicação realiza operações de CRUD para duas entidades, Usuários e Posts, e possui Real-time(WebSocket) através do GraphQL Subscriptions. 

## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias e bibliotecas:

- [GraphQL](https://graphql.org/)
- [Apollo-Server](https://www.apollographql.com/docs/apollo-server/)
- [GraphCMS](https://graphcms.com/)
- [Mongoose](https://mongoosejs.com/)
- [Docker](https://www.docker.com/)


## 🚀 Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone git@github.com:d0ugui/graphql-api.git
$ cd graphql-api
```
Configurando banco de dados
```bash
# Dentro do arquivo startServer.js, configure os dados de conexão
$ mongoose.connect('', {})...
```

Para iniciá-lo, siga os passos abaixo:

```bash
# Instalar as dependências
$ yarn or npm

# Iniciar o projeto
$ yarn dev or npm run dev
```

O app estará disponível no seu browser pelo endereço http://localhost:4000/graphql

## 📝 License

Esse projeto está sob a licença MIT.