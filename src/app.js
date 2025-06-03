import express from "express" // importando o express
import conexao from "../config/db.js" // importando a conexão com o bd

const app = express() // criando instância do express
app.use(express.json()) // indicar para o express ler body da requisição com js

export default app
//para rodar o projeto, vamos no terminal e digitamos: node src/app.js