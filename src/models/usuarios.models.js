const db = require('../config/db');

exports.buscarPorNome = async (nome) => {
    const [rows] = await db.query(
        'SELECT * FROM usuarios WHERE nome = ?',
        [nome]
    );
    return rows[0];
};

exports.criar = async ({ nome, senha }) => {
    const [result] = await db.query(
        'INSERT INTO usuarios (nome, senha_hash) VALUES (?, ?)',
        [nome, senha]
    );
    return result.insertId;
};
