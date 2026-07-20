const model = require('../models/usuarios.models');

// ⚠️ ATENÇÃO: por decisão explícita do usuário do projeto, a senha é
// gravada e comparada em TEXTO PURO, sem hash. Isso significa que
// qualquer pessoa com acesso ao banco (ou a um backup dele) vê a
// senha de todos os usuários diretamente. Recomendação da auditoria
// era usar crypto.scrypt (nativo do Node, sem instalar nada) ou
// bcryptjs — mantido sem hash por pedido explícito.

// POST /usuarios  { nome, senha }
exports.cadastrar = async (req, res, next) => {
    try {
        const { nome, senha } = req.body;

        if (!nome || typeof nome !== 'string' || nome.trim().length < 3) {
            return res.status(400).json({ erro: 'Nome de usuário deve ter pelo menos 3 caracteres.' });
        }
        if (!senha || typeof senha !== 'string' || senha.length < 6) {
            return res.status(400).json({ erro: 'Senha deve ter pelo menos 6 caracteres.' });
        }

        const nomeNormalizado = nome.trim();

        const existente = await model.buscarPorNome(nomeNormalizado);
        if (existente) {
            return res.status(409).json({ erro: 'Esse nome de usuário já está em uso.' });
        }

        const id = await model.criar({ nome: nomeNormalizado, senha });

        res.status(201).json({ id, nome: nomeNormalizado });
    } catch (err) {
        next(err);
    }
};

// POST /login  { nome, senha }
exports.login = async (req, res, next) => {
    try {
        const { nome, senha } = req.body;

        if (!nome || !senha) {
            return res.status(400).json({ erro: 'Nome e senha são obrigatórios.' });
        }

        const usuario = await model.buscarPorNome(nome.trim());
        if (!usuario || usuario.senha_hash !== senha) {
            return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
        }

        res.json({ id: usuario.id, nome: usuario.nome });
    } catch (err) {
        next(err);
    }
};
