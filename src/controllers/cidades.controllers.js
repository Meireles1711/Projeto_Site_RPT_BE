const model = require('../models/cidades.models');

exports.listar = async (req, res, next) => {
  try {
    const cidades = await model.buscarTodos();
    res.json(cidades);
  } catch (err) {
    next(err);
  }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const cidade = await model.buscarPorId(req.params.id);
    if (!cidade) return res.status(404).json({ erro: 'Cidade não encontrada' });
    res.json(cidade);
  } catch (err) {
    next(err);
  }
};

exports.criar = async (req, res, next) => {
  try {
    const { nome, uf } = req.body;

    if (!nome || typeof nome !== 'string' || nome.trim().length < 2) {
      return res.status(400).json({ erro: 'Nome da cidade é obrigatório.' });
    }
    if (!uf || typeof uf !== 'string' || uf.trim().length !== 2) {
      return res.status(400).json({ erro: 'UF deve ter 2 letras.' });
    }

    const id = await model.criar({ nome: nome.trim(), uf: uf.trim().toUpperCase() });
    res.status(201).json({ id, nome: nome.trim(), uf: uf.trim().toUpperCase() });
  } catch (err) {
    next(err);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const { nome, uf } = req.body;

    if (!nome || typeof nome !== 'string' || nome.trim().length < 2) {
      return res.status(400).json({ erro: 'Nome da cidade é obrigatório.' });
    }
    if (!uf || typeof uf !== 'string' || uf.trim().length !== 2) {
      return res.status(400).json({ erro: 'UF deve ter 2 letras.' });
    }

    await model.atualizar(req.params.id, { nome: nome.trim(), uf: uf.trim().toUpperCase() });

    res.json({ id: req.params.id, nome: nome.trim(), uf: uf.trim().toUpperCase() });
  } catch (err) {
    next(err);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    await model.deletar(req.params.id);
    res.json({ mensagem: 'Cidade Removida com Sucesso' });
  } catch (err) {
    next(err);
  }
};
