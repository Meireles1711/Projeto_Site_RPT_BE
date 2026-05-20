const model = require('../models/likes.models')

exports.curtir = async (req, res, next) => {
    try {
        await model.curtir(req.params.postId);
        res.json({ mensagem: 'Curtido!' });
    } catch (err) {
        next(err);
    }
};