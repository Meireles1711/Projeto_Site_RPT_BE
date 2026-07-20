const db = require('../config/db');

exports.buscarTodos= async () => {
    const [rows] = await db.query(
        'SELECT * FROM cidades'
    );
    return rows;
};

exports.buscarPorId = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM cidades WHERE id = ?',
        [id]
    );
    return rows[0];
};

exports.criar = async ({ nome, uf }) => {
    const [result] = await db.query(
        'INSERT INTO cidades (nome, uf) VALUES (?, ?)',
        [nome, uf]
    );

    return result.insertId;
};

exports.atualizar = async (id, { nome, uf }) => {
    await db.query(
        'UPDATE cidades SET nome = ?, uf = ? WHERE id = ?',
        [nome, uf, id]
    );
};

exports.deletar = async (id) => {
    await db.query(
        'DELETE FROM cidades WHERE id = ?',
        [id]
    );
};
