const model = require('../models/cidades.model');
exports.listar = async (req, res, next) => {
  try {
    const posts = await model.buscarTodos();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};


exports.buscarPorId = async (req, res, next) => {
    try {
      const posts = await model.buscarPorId(req.params.id);
      if (!posts) return res.status(404).json({ erro: 'Cidade não encontrada' });
      res.json(posts);
    } catch (err) {
      next(err);
    }
  };