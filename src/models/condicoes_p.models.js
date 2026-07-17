const db = require('../config/db');

exports.buscarTodos= async () => {
    const [rows] = await db.promise().query(
        'SELECT * FROM condicoes_pagamento'
    );
    return rows;
};

exports.buscarPorId = async (id) => {
    const [rows] = await db.promise().query(
        'SELECT * FROM condicoes_pagamento WHERE id = ?',
        [id]
    );
    return rows[0];
};

exports.criar = async ({descricao }) => {
    const [result] = await db.promise().query(
        'INSERT INTO condicoes_pagamento (descricao) VALUES (?)',
        [descricao]
    );

    return result.insertId;
};

exports.atualizar = async (id, { descricao}) => {
    await db.promise().query(
        'UPDATE condicoes_pagamento SET descricao = ? WHERE id = ?',
        [descricao, id]
    );
};

exports.deletar = async (id) => {
    await db.promise().query(
        'DELETE FROM condicoes_pagamento WHERE id = ?',
        [id]
    );
};
