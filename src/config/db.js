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
    database: process.env.DB_NAME || "nvstore",
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = db;
