import mysql from 'mysql2';
// Importa o pacote dotenv, usado para carregar variáveis de ambiente definidas em um arquivo `.env`
import dotenv from 'dotenv';

// Carrega as variáveis do arquivo `.env` para o `process.env`
// Isso permite acessar configurações sensíveis como senhas e chaves da forma: process.env.VARIAVEL
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST, // Endereço do host
  user: process.env.DB_USER, // Usuário do banco
  password: process.env.DB_PASS, // Senha do banco
  database: process.env.DB_NAME, // Nome do banco de dados
});

// Converte o pool para usar Promises, permitindo uso de async/await ao invés de callbacks
export default pool.promise();
