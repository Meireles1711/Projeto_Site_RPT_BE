// rotaCadastro.js
// Adicione essa rota ao seu servidor Express existente (mesmo arquivo/pasta das outras rotas).
// Requer: npm install bcrypt
//
// Pressupõe que você já tem uma conexão MySQL disponível como `conexao`
// (mesmo padrão usado nas outras rotas do projeto, ex.: /clientes, /cidades).
// Ajuste o nome da variável de conexão conforme seu server.js real.

const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

module.exports = function (app, conexao) {

  app.post("/cadastro", async (req, res) => {
    const { nome, senha } = req.body;

    // Validação básica no backend (não confiar só no front-end)
    if (!nome || typeof nome !== "string" || nome.trim().length < 3) {
      return res.status(400).json({ erro: "Nome inválido." });
    }
    if (!senha || typeof senha !== "string" || senha.length < 6) {
      return res.status(400).json({ erro: "Senha deve ter pelo menos 6 caracteres." });
    }

    const nomeNormalizado = nome.trim();

    try {
      // Verifica se o nome já existe
      const [existentes] = await conexao.promise().query(
        "SELECT id FROM usuarios WHERE nome = ?",
        [nomeNormalizado]
      );

      if (existentes.length > 0) {
        return res.status(409).json({ erro: "Nome de usuário já cadastrado." });
      }

      // Gera o hash da senha (nunca salvar em texto puro)
      const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

      await conexao.promise().query(
        "INSERT INTO usuarios (nome, senha_hash) VALUES (?, ?)",
        [nomeNormalizado, senhaHash]
      );

      return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso." });

    } catch (erro) {
      console.error("Erro ao cadastrar usuário:", erro);
      return res.status(500).json({ erro: "Erro interno ao cadastrar usuário." });
    }
  });

};

// No server.js, importe e registre assim:
//
// const conexao = require("./db"); // seu módulo de conexão MySQL existente
// require("./rotaCadastro")(app, conexao);
