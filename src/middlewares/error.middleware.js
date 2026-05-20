module.exports = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        erro: 'ERRO: Problemas internos no servidor'
    })
}