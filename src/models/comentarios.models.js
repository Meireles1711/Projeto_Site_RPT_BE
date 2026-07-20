const db = require('../config/db')

exports.buscarPorPost = async (postId) => {
    const [rows] = await db.query(
        'SELECT * FROM comentarios WHERE post_id = ? ORDER BY criado_em DESC',
        [postId]
    );
    return rows;
};

exports.criar = async ({ post_id, autor, conteudo }) => {
    const [result] = await db.query(
        'INSERT INTO comentarios (post_id, autor, conteudo) VALUES (?,?,?)',
        [post_id, autor, conteudo]
    );
    return result.insertId;
};