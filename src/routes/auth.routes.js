// =========================================================
// ROTAS DE AUTENTICAÇÃO — exemplo pra colar/adaptar no seu Express
//
// Instalar antes:
//   npm install bcrypt jsonwebtoken mysql2
//
// Pressupõe que você já tem uma conexão MySQL configurada (aqui
// chamada de "db") e a tabela `usuarios` criada (veja sql/usuarios.sql).
// =========================================================

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

// ⚠️ Em produção, isso deve vir de uma variável de ambiente, nunca
// ficar escrito no código (ex: process.env.JWT_SECRET)
const JWT_SECRET = process.env.JWT_SECRET || "troque-este-segredo";

// -------------------------------------------
// POST /cadastro  { nome, senha }
// -------------------------------------------
router.post("/cadastro", async (req, res) => {
    const { nome, senha } = req.body;

    if (!nome || !senha || senha.length < 6) {
        return res.status(400).json({ erro: "Nome e senha (mín. 6 caracteres) são obrigatórios." });
    }

    try {
        const [existentes] = await db.query("SELECT id FROM usuarios WHERE nome = ?", [nome]);
        if (existentes.length > 0) {
            return res.status(409).json({ erro: "Esse nome de usuário já está em uso." });
        }

        const senhaHash = await bcrypt.hash(senha, 10);
        await db.query("INSERT INTO usuarios (nome, senha_hash) VALUES (?, ?)", [nome, senhaHash]);

        return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso." });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao cadastrar usuário." });
    }
});

// -------------------------------------------
// POST /login  { nome, senha }
// -------------------------------------------
router.post("/login", async (req, res) => {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
        return res.status(400).json({ erro: "Nome e senha são obrigatórios." });
    }

    try {
        const [linhas] = await db.query("SELECT * FROM usuarios WHERE nome = ?", [nome]);
        const usuario = linhas[0];

        if (!usuario) {
            return res.status(401).json({ erro: "Usuário ou senha inválidos." });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
        if (!senhaValida) {
            return res.status(401).json({ erro: "Usuário ou senha inválidos." });
        }

        const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, JWT_SECRET, { expiresIn: "8h" });

        return res.json({ token, nome: usuario.nome });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao fazer login." });
    }
});

module.exports = router;

// No seu app.js/server.js principal:
//   const authRoutes = require("./authRoutes");
//   app.use(authRoutes);
