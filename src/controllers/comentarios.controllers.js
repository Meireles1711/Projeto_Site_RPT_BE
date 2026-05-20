const model = require('../models/comentarios.models')

exports.listarPorPost = async (req, res, next) => {
    try {
        const comentarios = await model.buscarPorPost(req.params.postId);
        res.json(comentarios);
    } catch (err) {
        next(err);
    }
};

exports.criar = async (req, res, next) => {
    try {
        const { autor, conteudo } = req.body;
        const id = await model.criar({
            post_id: req.params.postId,
            autor,
            conteudo
        });
        res.status(201).json({ id, autor, conteudo});
    } catch (err) {
        next(err);
    }
};                 