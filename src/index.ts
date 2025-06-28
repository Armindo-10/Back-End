import express from 'express'
import rootRouter from './routes/index.js'
import { PrismaClient } from '../generated/prisma/index.js'
import SwaggerUi from 'swagger-ui-express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import hpp from 'hpp';
import cors from 'cors';
import xss from 'xss'
import mongoSanitize from 'express-mongo-sanitize'
import morgan from 'morgan'
// @ts-ignore
import swaggerDocuments from '../swagger.json'

const app = express();
app.use(express.json());
const PORT = 3000;

// camadas de segurança

app.use(helmet()); // proteção contra headers de segurança
app.disable("X-Powered-By"); // desabilitando o framework usado na aplicação para evitar coleta de informações...

// proteção contra ataque de força bruta e DDOS(negação de serviço)
const limit = (rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: 'excedeu o limite de requisições , tente mais tarde'
}));
app.use(limit);

app.use(hpp()); // protegendo a aplicação contra parâmetro de poluição nas requisições 

// protegendo a aplicação contra acessos a requisição da Agroway controlar a origem
app.use(cors({
  origin: "https://agroway-frontend.netlify.app/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,

}));


//redirecionando automático de http para https
if (process.env.NODE_ENV === 'production') {
   app.enable("trust proxy")
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// sinatização contra xss e injeções
app.use((req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key])
      }
    }
  }
  next();
});

// sanitização contra noSql injection
app.use(mongoSanitize());

// logger para monitorar tentativas suspeitas
app.use(morgan('combined'));


export const prisma = new PrismaClient({})
app.use('/api', rootRouter);


if (process.env.NODE_ENV === 'development') {
  app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocuments));
}

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
