const express = require('express');
const cors = require('cors');
require('dotenv').config();

const postsRoutes = require('./routes/posts.routes');
const comentariosRoutes = require('./routes/comentarios.routes');
const likesRoutes = require('./routes/likes.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/posts', postsRoutes);
app.use('/comentarios', comentariosRoutes);
app.use('/likes', likesRoutes);

app.use(errorMiddleware);

module.exports = app;