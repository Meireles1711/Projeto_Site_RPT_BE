const model = require('../models/clientes.models');

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
      if (!posts) return res.status(404).json({ erro: 'Cliente não encontrado' });
      res.json(posts);
    } catch (err) {
      next(err);
    }
  };


  exports.criar = async (req, res, next) => {
      try {
          const {nome, endereco,bairro,cep,cidade_id,cpf,email,telefone,observacoes} = req.body;
          const id = await model.criar({nome, endereco,bairro,cep,cidade_id,cpf,email,telefone,observacoes});
          res.status(201).json({ id,nome, endereco,bairro,cep,cidade_id,cpf,email,telefone,observacoes });
      } catch (err) {
          next(err);
      }
  };
  exports.atualizar = async (req, res, next) => {
    try {
        const {nome, endereco,bairro,cep,cidade_id,cpf,email,telefone,observacoes} = req.body;

        await model.atualizar(req.params.id, {nome, endereco,bairro,cep,cidade_id,cpf,email,telefone,observacoes});

        res.json({
            id: req.params.id,
            nome,
             endereco,
             bairro,
             cep,
             cidade_id,
             cpf,
             email,
             telefone,
             observacoes
        });
    } catch (err) {
        next(err);
    }
};
  
  exports.deletar = async (req, res, next) => {
      try {
          await model.deletar(req.params.id);
          res.json({ mensagem: 'Cliente  Removido com Sucesso'});
      } catch (err) {
          next(err);
          
      }
  };
  
  