require('dotenv').config();

const express = require('express');
const conectarDB = require('./config/db')
const router = require('./routes/nota')
const authRouter = require('./routes/auth')
// cors is a middleware that allows you to enable Cross-Origin Resource Sharing (CORS) in your Express application.
const cors = require('cors');

const app = express();

conectarDB(); // Conectar a la base de datos

const allowedOrigins = [
  'https://frontend-proyecto-final-ultima-vers.vercel.app',
  'http://localhost:4200',
  'http://localhost:5173'
];

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true); // Permitir Postman/curl
    return allowedOrigins.includes(origin)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','x-auth-token'],
  optionsSuccessStatus: 204
}));

// Responder explícitamente preflights
app.options('*', cors());

const port = 3000;

//middleware para leer datos en formato JSON
app.use(express.json())

app.use('/api', router); // Usar las rutas de notas
app.use('/api/auth', authRouter)


app.get('/', (req, res) => {
    res.send("hola mundo desde express");
})



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})