
const db = require('../config/db');

exports.buscarTodos = async () => {
    const [rows] = await db.promise().query(
        'SELECT * FROM clientes'
    );
    return rows;
};

exports.buscarPorId = async (id) => {
    const [rows] = await db.promise().query(
        'SELECT * FROM clientes WHERE id = ?',
        [id]
    );
    return rows[0];
};

exports.criar = async ({
    nome,
    endereco,
    bairro,
    cep,
    cidade_id,
    cpf,
    email,
    telefone,
    observacoes
}) => {
    const [result] = await db.promise().query(
        `INSERT INTO clientes
        (nome, endereco, bairro, cep, cidade_id, cpf, email, telefone, observacoes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            nome,
            endereco,
            bairro,
            cep,
            cidade_id,
            cpf,
            email,
            telefone,
            observacoes
        ]
    );

    return result.insertId;
};

exports.atualizar = async (
    id,
    {
        nome,
        endereco,
        bairro,
        cep,
        cidade_id,
        cpf,
        email,
        telefone,
        observacoes
    }
) => {
    await db.promise().query(
        `UPDATE clientes SET
            nome = ?,
            endereco = ?,
            bairro = ?,
            cep = ?,
            cidade_id = ?,
            cpf = ?,
            email = ?,
            telefone = ?,
            observacoes = ?
        WHERE id = ?`,
        [
            nome,
            endereco,
            bairro,
            cep,
            cidade_id,
            cpf,
            email,
            telefone,
            observacoes,
            id
        ]
    );
};

exports.deletar = async (id) => {
    await db.promise().query(
        'DELETE FROM clientes WHERE id = ?',
        [id]
    );
};