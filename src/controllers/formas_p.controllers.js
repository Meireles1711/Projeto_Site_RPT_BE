const model = require('../models/formas_p.models');

exports.listar = async (req, res, next) => {
  try {
    const formas = await model.buscarTodos();
    res.json(formas);
  } catch (err) {
    next(err);
  }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const forma = await model.buscarPorId(req.params.id);
    if (!forma) return res.status(404).json({ erro: 'Forma de pagamento não encontrada' });
    res.json(forma);
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
    res.json({ mensagem: 'Forma de pagamento Removida com Sucesso' });
  } catch (err) {
    next(err);
  }
};
