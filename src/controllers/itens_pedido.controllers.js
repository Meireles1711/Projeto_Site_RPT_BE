const model = require('../models/itens_pedido.models');

exports.listar = async (req, res, next) => {
  try {
    const itens = await model.buscarTodos();
    res.json(itens);
  } catch (err) {
    next(err);
  }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const item = await model.buscarPorId(req.params.id);
    if (!item) return res.status(404).json({ erro: 'Item não encontrado' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

function validarItem(body) {
  const { pedido_id, produto_id, valor_unit, quantidade } = body;
  if (!pedido_id) return 'Pedido é obrigatório.';
  if (!produto_id) return 'Produto é obrigatório.';
  if (valor_unit === undefined || valor_unit === null || isNaN(Number(valor_unit)) || Number(valor_unit) < 0) {
    return 'Valor unitário inválido.';
  }
  if (quantidade === undefined || quantidade === null || isNaN(Number(quantidade)) || Number(quantidade) <= 0) {
    return 'Quantidade inválida.';
  }
  return null;
}

exports.criar = async (req, res, next) => {
  try {
    const { pedido_id, produto_id, descricao, valor_unit, quantidade, subtotal } = req.body;

    const erro = validarItem(req.body);
    if (erro) return res.status(400).json({ erro });

    const id = await model.criar({ pedido_id, produto_id, descricao, valor_unit, quantidade, subtotal });
    res.status(201).json({ id, pedido_id, produto_id, descricao, valor_unit, quantidade, subtotal });
  } catch (err) {
    next(err);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const { pedido_id, produto_id, descricao, valor_unit, quantidade, subtotal } = req.body;

    const erro = validarItem(req.body);
    if (erro) return res.status(400).json({ erro });

    await model.atualizar(req.params.id, { pedido_id, produto_id, descricao, valor_unit, quantidade, subtotal });

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
    res.json({ mensagem: 'Item Removido com Sucesso' });
  } catch (err) {
    next(err);
  }
};
