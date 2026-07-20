const model = require('../models/produtos.models');

exports.listar = async (req, res, next) => {
  try {
    const produtos = await model.buscarTodos();
    res.json(produtos);
  } catch (err) {
    next(err);
  }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const produto = await model.buscarPorId(req.params.id);
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(produto);
  } catch (err) {
    next(err);
  }
};

function validarProduto(body) {
  const { descricao, valor_unit, estoque } = body;
  if (!descricao || typeof descricao !== 'string' || descricao.trim().length < 2) {
    return 'Descrição do produto é obrigatória.';
  }
  if (valor_unit === undefined || valor_unit === null || isNaN(Number(valor_unit)) || Number(valor_unit) < 0) {
    return 'Valor unitário inválido.';
  }
  if (estoque !== undefined && estoque !== null && (isNaN(Number(estoque)) || Number(estoque) < 0)) {
    return 'Estoque inválido.';
  }
  return null;
}

exports.criar = async (req, res, next) => {
  try {
    const { descricao, unidade, valor_unit, estoque } = req.body;

    const erro = validarProduto(req.body);
    if (erro) return res.status(400).json({ erro });

    const id = await model.criar({ descricao, unidade, valor_unit, estoque });
    res.status(201).json({ id, descricao, unidade, valor_unit, estoque });
  } catch (err) {
    next(err);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const { descricao, unidade, valor_unit, estoque } = req.body;

    const erro = validarProduto(req.body);
    if (erro) return res.status(400).json({ erro });

    await model.atualizar(req.params.id, { descricao, unidade, valor_unit, estoque });

    res.json({ id: req.params.id, descricao, unidade, valor_unit, estoque });
  } catch (err) {
    next(err);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    await model.deletar(req.params.id);
    res.json({ mensagem: 'Produto Removido com Sucesso' });
  } catch (err) {
    next(err);
  }
};
