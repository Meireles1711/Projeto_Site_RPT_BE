const db = require('../config/db');

exports.buscarTodos= async () => {
    const [rows] = await db.query(
        'SELECT * FROM formas_pagamento'
    );
    return rows;
};

exports.buscarPorId = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM formas_pagamento WHERE id = ?',
        [id]
    );
    return rows[0];
};

exports.criar = async ({descricao }) => {
    const [result] = await db.query(
        'INSERT INTO formas_pagamento (descricao) VALUES (?)',
        [descricao]
    );

    return result.insertId;
};

exports.atualizar = async (id, { descricao}) => {
    await db.query(
        'UPDATE formas_pagamento SET descricao = ? WHERE id = ?',
        [descricao, id]
    );
};

exports.deletar = async (id) => {
    await db.query(
        'DELETE FROM formas_pagamento WHERE id = ?',
        [id]
    );
};
