// =========================================================
// CONEXÃO COM O BANCO (MySQL)
//
// Instalar antes:
//   npm install mysql2
//
// As credenciais vêm de variáveis de ambiente — no Railway, cada uma
// é preenchida automaticamente quando você referencia o serviço MySQL
// (ex: DB_HOST = ${{MySQL.MYSQLHOST}}). Localmente, crie um arquivo
// .env com os mesmos nomes apontando pro seu MySQL Workbench.
// =========================================================

const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    // CORRIGIDO: o .env do projeto usa DB_DATABASE, não DB_NAME.
    // Com o nome errado, process.env.DB_DATABASE nunca era lido e o
    // pool sempre tentava conectar no banco "nvstore" (que não existe),
    // em vez de "sistema_vendas".
    database: process.env.DB_DATABASE || "sistema_vendas",
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = db;
