const model = require('../models/itens_pedido.models');

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
      if (!posts) return res.status(404).json({ erro: 'Itens não encontrados' });
      res.json(posts);
    } catch (err) {
      next(err);
    }
  };


  exports.criar = async (req, res, next) => {
      try {
          const { pedido_id, produto_id,descricao,valor_unit,quantidade,subtotal  } = req.body;
          const id = await model.criar({ pedido_id, produto_id,descricao,valor_unit,quantidade,subtotal });
          res.status(201).json({ id, pedido_id, produto_id,descricao,valor_unit,quantidade,subtotal  });
      } catch (err) {
          next(err);
      }
  };
  exports.atualizar = async (req, res, next) => {
    try {
        const {  pedido_id, produto_id,descricao,valor_unit,quantidade,subtotal  } = req.body;

        await model.atualizar(req.params.id, {  pedido_id, produto_id,descricao,valor_unit,quantidade,subtotal });

        res.json({
            id: req.params.id,
            pedido_id,
             produto_id,
             descricao,
             valor_unit,
             quantidade,
             subtotal 
        });
    } catch (err) {
        next(err);
    }
};
  
  exports.deletar = async (req, res, next) => {
      try {
          await model.deletar(req.params.id);
          res.json({ mensagem: 'Itens Removidos com Sucesso'});
      } catch (err) {
          next(err);
          
      }
  };
  
  