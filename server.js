import express from 'express';
import dotenv from 'dotenv';
import testRoutes from './routes/test.js';

const PORT = process.env.PORT || 3000; // definindo porta do projeto

dotenv.config();
const app = express();
app.use(express.json());

app.use('/', testRoutes); // Agora acessível em /

//escutando a porta 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`)
})
