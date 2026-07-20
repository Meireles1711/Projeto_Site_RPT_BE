const express = require('express');
const cors = require('cors');
require('dotenv').config();

const cidadesRoutes = require('./routes/cidades.routes');
const condicaoRoutes = require('./routes/condicoes_p.routes');
const formaRoutes = require('./routes/formas_p.routes');
const produtosRoutes = require('./routes/produtos.routes');
const clientesRoutes = require('./routes/clientes.routes');
const pedidosRoutes = require('./routes/pedidos.routes');
const itensRoutes = require('./routes/itens_pedido.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const loginRoutes = require('./routes/login.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/cidades', cidadesRoutes);
app.use('/condicao', condicaoRoutes);
app.use('/formas', formaRoutes);
app.use('/produtos', produtosRoutes);
app.use('/clientes', clientesRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/itens', itensRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/login', loginRoutes);

app.use(errorMiddleware);

module.exports = app;