const model = require('../models/clientes.models');

exports.listar = async (req, res, next) => {
  try {
    const clientes = await model.buscarTodos();
    res.json(clientes);
  } catch (err) {
    next(err);
  }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const cliente = await model.buscarPorId(req.params.id);
    if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (err) {
    next(err);
  }
};

function validarCliente(body) {
  const { nome, cidade_id, cpf } = body;
  if (!nome || typeof nome !== 'string' || nome.trim().length < 2) {
    return 'Nome do cliente é obrigatório.';
  }
  if (!cidade_id) {
    return 'Cidade é obrigatória.';
  }
  if (!cpf || typeof cpf !== 'string' || cpf.replace(/\D/g, '').length !== 11) {
    return 'CPF inválido.';
  }
  return null;
}

exports.criar = async (req, res, next) => {
  try {
    const { nome, endereco, bairro, cep, cidade_id, cpf, email, telefone, observacoes } = req.body;

    const erro = validarCliente(req.body);
    if (erro) return res.status(400).json({ erro });

    const id = await model.criar({ nome, endereco, bairro, cep, cidade_id, cpf, email, telefone, observacoes });
    res.status(201).json({ id, nome, endereco, bairro, cep, cidade_id, cpf, email, telefone, observacoes });
  } catch (err) {
    next(err);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const { nome, endereco, bairro, cep, cidade_id, cpf, email, telefone, observacoes } = req.body;

    const erro = validarCliente(req.body);
    if (erro) return res.status(400).json({ erro });

    await model.atualizar(req.params.id, { nome, endereco, bairro, cep, cidade_id, cpf, email, telefone, observacoes });

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
    res.json({ mensagem: 'Cliente Removido com Sucesso' });
  } catch (err) {
    next(err);
  }
};
