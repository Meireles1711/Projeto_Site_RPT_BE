const model = require('../models/condicoes_p.models');

exports.listar = async (req, res, next) => {
  try {
    const condicoes = await model.buscarTodos();
    res.json(condicoes);
  } catch (err) {
    next(err);
  }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const condicao = await model.buscarPorId(req.params.id);
    if (!condicao) return res.status(404).json({ erro: 'Condição de pagamento não encontrada' });
    res.json(condicao);
  } catch (err) {
    next(err);
  }
};

exports.criar = async (req, res, next) => {
  try {
    const { descricao } = req.body;

    if (!descricao || typeof descricao !== 'string' || descricao.trim().length < 2) {
      return res.status(400).json({ erro: 'Descrição é obrigatória.' });
    }

    const id = await model.criar({ descricao: descricao.trim() });
    res.status(201).json({ id, descricao: descricao.trim() });
  } catch (err) {
    next(err);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const { descricao } = req.body;

    if (!descricao || typeof descricao !== 'string' || descricao.trim().length < 2) {
      return res.status(400).json({ erro: 'Descrição é obrigatória.' });
    }

    await model.atualizar(req.params.id, { descricao: descricao.trim() });

    res.json({ id: req.params.id, descricao: descricao.trim() });
  } catch (err) {
    next(err);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    await model.deletar(req.params.id);
    res.json({ mensagem: 'Condição de pagamento Removida com Sucesso' });
  } catch (err) {
    next(err);
  }
};
