const db = require('../config/db');

exports.buscarTodos= async () => {
    const [rows] = await db.query(
        'SELECT * FROM pedidos'
    );
    return rows;
};

exports.buscarPorId = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM pedidos WHERE id = ?',
        [id]
    );
    return rows[0];
};

exports.criar = async ({ data, cliente_id,condicao_pagamento_id,forma_pagamento_id,prazo_entrega }) => {
    const [result] = await db.query(
        'INSERT INTO pedidos (data, cliente_id,condicao_pagamento_id,forma_pagamento_id,prazo_entrega) VALUES (?,?,?,?,?)',
        [ data, cliente_id,condicao_pagamento_id,forma_pagamento_id,prazo_entrega ]
    );

    return result.insertId;
};

exports.atualizar = async (id, { data, cliente_id,condicao_pagamento_id,forma_pagamento_id,prazo_entrega }) => {
    await db.query(
        'UPDATE pedidos SET data = ?, cliente_id= ?, condicao_pagamento_id = ? ,forma_pagamento_id= ? , prazo_entrega = ? WHERE id = ?',
        [ data, cliente_id,condicao_pagamento_id,forma_pagamento_id,prazo_entrega, id]
    );
};

exports.deletar = async (id) => {
    await db.query(
        'DELETE FROM pedidos WHERE id = ?',
        [id]
    );
};
