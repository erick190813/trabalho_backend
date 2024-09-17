const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware de Autenticação de Sessão
app.use(session({
    secret: 'senai456',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

const authRoutes = require('./routes/auth');
const routesPaginas = require('./routes/paginas');
const cadastroRoutes = require('./routes/cadastro');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Rota de Autenticação de Login e Senha
app.use('/api/auth', authRoutes);

// Rota de Cadastro
app.use('/api/cadastro', cadastroRoutes);

// Rotas de Páginas do sistema
app.use('/', routesPaginas);
app.use('/api/paginas', routesPaginas);

// Rota Para Sistema de Curtidas


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});
