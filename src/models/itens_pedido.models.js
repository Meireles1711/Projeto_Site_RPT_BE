const db = require('../config/db');

exports.buscarTodos= async () => {
    const [rows] = await db.promise().query(
        'SELECT * FROM itens_pedido'
    );
    return rows;
};

exports.buscarPorId = async (id) => {
    const [rows] = await db.promise().query(
        'SELECT * FROM itens_pedido WHERE id = ?',
        [id]
    );
    return rows[0];
};

exports.criar = async ({ pedido_id, produto_id,descricao,valor_unit,quantidade,subtotal }) => {
    const [result] = await db.promise().query(
        'INSERT INTO itens_pedido (pedido_id, produto_id,descricao,valor_unit,quantidade,subtotal ) VALUES (?, ?,?,?,?,?)',
        [pedido_id, produto_id,descricao,valor_unit,quantidade,subtotal ]
    );

    return result.insertId;
};

exports.atualizar = async (id, {pedido_id, produto_id,descricao,valor_unit,quantidade,subtotal }) => {
    await db.promise().query(
        'UPDATE itens_pedido SET pedido_id = ?,produto_id = ? ,descricao = ? ,valor_unit = ? ,quantidade = ? ,subtotal  = ?  WHERE id = ?',
        [pedido_id, produto_id,descricao,valor_unit,quantidade,subtotal , id]
    );
};

exports.deletar = async (id) => {
    await db.promise().query(
        'DELETE FROM itens_pedido WHERE id = ?',
        [id]
    );
};
