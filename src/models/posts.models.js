const db = require('../config/db')

exports.buscarTodos = async () => {
    const [rows] = await db.promise().query(`
        SELECT  p.*,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as total_likes
        FROM posts p
        ORDER BY p.criado_em DESC
        `);
    return rows;
};

exports.buscarPorId = async (id) => {
    const [rows] = await db.promise().query(
        'SELECT * FROM posts WHERE id = ?',
        [id]
    );
    return rows[0];
};

exports.criar = async ({ autor, conteudo }) => {
    const [result] = await db.promise().query(
        'INSERT INTO posts (autor, conteudo) VALUES (?, ?)',
        [autor, conteudo]
    );
    return result.insertId;
};

exports.deletar = async (id) => {
    await db.promise().query(
        'DELETE FROM posts WHERE id = ?',
        [id]
    );
};