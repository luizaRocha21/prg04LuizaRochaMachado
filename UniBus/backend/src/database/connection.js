const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lurm2112',
    database: 'unibus'
});

connection.connect((err) => {
    if (err) {
        console.log('Erro ao conectar no MySQL:', err);
    } else {
        console.log('Conectado ao MySQL com sucesso!');
    }
});

module.exports = connection;