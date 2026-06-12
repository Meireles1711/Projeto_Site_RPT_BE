const model = require('../models/pedidos.models');

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
      if (!posts) return res.status(404).json({ erro: 'Pedido não encontrado' });
      res.json(posts);
    } catch (err) {
      next(err);
    }
  };


  exports.criar = async (req, res, next) => {
      try {
          const {data, cliente_id,condicao_pagamento_id,forma_pagamento_id,prazo_entrega } = req.body;
          const id = await model.criar({data, cliente_id,condicao_pagamento_id,forma_pagamento_id,prazo_entrega });
          res.status(201).json({ id,data, cliente_id,condicao_pagamento_id,forma_pagamento_id,prazo_entrega });
      } catch (err) {
          next(err);
      }
  };
  exports.atualizar = async (req, res, next) => {
    try {
        const {data, cliente_id,condicao_pagamento_id,forma_pagamento_id,prazo_entrega } = req.body;

        await model.atualizar(req.params.id, {data, cliente_id,condicao_pagamento_id,forma_pagamento_id,prazo_entrega });

        res.json({
            id: req.params.id,
            data,
             cliente_id,
             condicao_pagamento_id,
             forma_pagamento_id,
             prazo_entrega 
        });
    } catch (err) {
        next(err);
    }
};
  
  exports.deletar = async (req, res, next) => {
      try {
          await model.deletar(req.params.id);
          res.json({ mensagem: 'Pedido Removido com Sucesso'});
      } catch (err) {
          next(err);
          
      }
  };
  
  