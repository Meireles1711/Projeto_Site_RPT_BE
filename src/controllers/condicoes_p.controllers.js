const model = require('../models/condicoes_p.models');

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
      if (!posts) return res.status(404).json({ erro: 'Condição de pagamento não encontrada' });
      res.json(posts);
    } catch (err) {
      next(err);
    }
  };


  exports.criar = async (req, res, next) => {
      try {
          const { descricao } = req.body;
          const id = await model.criar({ descricao });
          res.status(201).json({ id,descricao});
      } catch (err) {
          next(err);
      }
  };
  exports.atualizar = async (req, res, next) => {
    try {
        const {descricao } = req.body;

        await model.atualizar(req.params.id, { descricao });

        res.json({
            id: req.params.id,
            descricao
        });
    } catch (err) {
        next(err);
    }
};
  
  exports.deletar = async (req, res, next) => {
      try {
          await model.deletar(req.params.id);
          res.json({ mensagem: 'Condição de pagamento Removida com Sucesso'});
      } catch (err) {
          next(err);
          
      }
  };
  
  