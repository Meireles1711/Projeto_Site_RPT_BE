const model = require('../models/produtos.models');

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
      if (!posts) return res.status(404).json({ erro: 'Produto não encontrada' });
      res.json(posts);
    } catch (err) {
      next(err);
    }
  };


  exports.criar = async (req, res, next) => {
      try {
          const {descricao, unidade,valor_unit,estoque} = req.body;
          const id = await model.criar({descricao, unidade,valor_unit,estoque});
          res.status(201).json({ id,descricao, unidade,valor_unit,estoque});
      } catch (err) {
          next(err);
      }
  };
  exports.atualizar = async (req, res, next) => {
    try {
        const {descricao, unidade,valor_unit,estoque} = req.body;

        await model.atualizar(req.params.id, {descricao, unidade,valor_unit,estoque});

        res.json({
            id: req.params.id,
            descricao,
             unidade,
             valor_unit,
             estoque
        });
    } catch (err) {
        next(err);
    }
};
  
  exports.deletar = async (req, res, next) => {
      try {
          await model.deletar(req.params.id);
          res.json({ mensagem: 'Produto Removida com Sucesso'});
      } catch (err) {
          next(err);
          
      }
  };
  
  