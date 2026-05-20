const model = require('../models/posts.models');

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
        const post = await model.buscarPorId(req.params.id);
        if (!post) return res.status(404).json({ erro: 'Post Não Encontrado' });
        res.json(post);
    } catch (err) {
        next(err);
    }
};

exports.criar = async (req, res, next) => {
    try {
        const { autor, conteudo } = req.body;
        const id = await model.criar({ autor, conteudo });
        res.status(201).json({ id, autor, conteudo });
    } catch (err) {
        next(err);
    }
};

exports.deletar = async (req, res, next) => {
    try {
        await model.deletar(req.params.id);
        res.json({ mensagem: 'Post Removido com Sucesso'});
    } catch (err) {
        next(err);
        
    }
};

