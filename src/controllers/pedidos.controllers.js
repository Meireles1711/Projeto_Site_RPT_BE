const model = require('../models/pedidos.models');

exports.listar = async (req, res, next) => {
  try {
    const pedidos = await model.buscarTodos();
    res.json(pedidos);
  } catch (err) {
    next(err);
  }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const pedido = await model.buscarPorId(req.params.id);
    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' });
    res.json(pedido);
  } catch (err) {
    next(err);
  }
};

function validarPedido(body) {
  const { data, cliente_id, condicao_pagamento_id, forma_pagamento_id } = body;
  if (!data || isNaN(Date.parse(data))) {
    return 'Data do pedido inválida.';
  }
  if (!cliente_id) {
    return 'Cliente é obrigatório.';
  }
  if (!condicao_pagamento_id) {
    return 'Condição de pagamento é obrigatória.';
  }
  if (!forma_pagamento_id) {
    return 'Forma de pagamento é obrigatória.';
  }
  return null;
}

exports.criar = async (req, res, next) => {
  try {
    const { data, cliente_id, condicao_pagamento_id, forma_pagamento_id, prazo_entrega } = req.body;

    const erro = validarPedido(req.body);
    if (erro) return res.status(400).json({ erro });

    const id = await model.criar({ data, cliente_id, condicao_pagamento_id, forma_pagamento_id, prazo_entrega });
    res.status(201).json({ id, data, cliente_id, condicao_pagamento_id, forma_pagamento_id, prazo_entrega });
  } catch (err) {
    next(err);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const { data, cliente_id, condicao_pagamento_id, forma_pagamento_id, prazo_entrega } = req.body;

    const erro = validarPedido(req.body);
    if (erro) return res.status(400).json({ erro });

    await model.atualizar(req.params.id, { data, cliente_id, condicao_pagamento_id, forma_pagamento_id, prazo_entrega });

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
    res.json({ mensagem: 'Pedido Removido com Sucesso' });
  } catch (err) {
    next(err);
  }
};
