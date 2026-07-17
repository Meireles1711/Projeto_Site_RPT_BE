const db = require('../config/db');

exports.buscarTodos= async () => {
    const [rows] = await db.promise().query(
        'SELECT * FROM produtos'
    );
    return rows;
};

exports.buscarPorId = async (id) => {
    const [rows] = await db.promise().query(
        'SELECT * FROM produtos WHERE id = ?',
        [id]
    );
    return rows[0];
};

exports.criar = async ({descricao, unidade,valor_unit,estoque}) => {
    const [result] = await db.promise().query(
        'INSERT INTO produtos (descricao, unidade,valor_unit,estoque) VALUES (?, ?,?,?)',
        [descricao, unidade,valor_unit,estoque]
    );

    return result.insertId;
};

exports.atualizar = async (id, {descricao, unidade,valor_unit,estoque }) => {
    await db.promise().query(
        'UPDATE produtos SET descricao = ?, unidade = ?, valor_unit = ?, estoque = ? WHERE id = ?',
        [descricao, unidade,valor_unit,estoque, id]
    );
};

exports.deletar = async (id) => {
    await db.promise().query(
        'DELETE FROM produtos WHERE id = ?',
        [id]
    );
};
