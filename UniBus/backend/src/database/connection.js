require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

pool.query('SELECT 1')
    .then(() => console.log('Conectado ao Supabase (PostgreSQL) com sucesso!'))
    .catch((err) => console.log('Erro ao conectar no Supabase:', err.message));

function paraPlaceholdersPostgres(sql) {
    let contador = 0;
    let dentroDeString = false;
    let resultado = '';

    for (let i = 0; i < sql.length; i++) {
        const char = sql[i];

        if (char === "'") {
            dentroDeString = !dentroDeString;
        }

        if (char === '?' && !dentroDeString) {
            contador++;
            resultado += `$${contador}`;
        } else {
            resultado += char;
        }
    }

    return resultado;
}


function query(sql, params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = [];
    }

    params = params || [];

    let sqlConvertido = paraPlaceholdersPostgres(sql);

    const isInsert = /^\s*insert/i.test(sqlConvertido);
    const jaTemReturning = /returning/i.test(sqlConvertido);

    if (isInsert && !jaTemReturning) {
        sqlConvertido = sqlConvertido.replace(/;?\s*$/, ' RETURNING id;');
    }

    pool.query(sqlConvertido, params)
        .then((resultado) => {
            const linhas = resultado.rows;

            if (isInsert) {
                linhas.insertId = linhas[0] ? linhas[0].id : undefined;
                linhas.affectedRows = resultado.rowCount;
            } else {
                linhas.affectedRows = resultado.rowCount;
            }

            callback(null, linhas);
        })
        .catch((err) => {
            callback(err);
        });
}

module.exports = { query };