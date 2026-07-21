require('dotenv').config();
const { Pool } = require('pg');

// A connection string do Supabase fica em uma variável de ambiente.
// Pegue em: Supabase -> Project Settings -> Database -> Connection string (URI)
// Formato: postgresql://postgres:[SUA_SENHA]@[HOST]:5432/postgres
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

pool.query('SELECT 1')
    .then(() => console.log('Conectado ao Supabase (PostgreSQL) com sucesso!'))
    .catch((err) => console.log('Erro ao conectar no Supabase:', err.message));

// Converte "SELECT * FROM x WHERE id = ?" -> "SELECT * FROM x WHERE id = $1"
// (não mexe em '?' dentro de strings entre aspas simples)
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

// Mantém a mesma assinatura usada em todos os controllers:
//   db.query(sql, callback)
//   db.query(sql, params, callback)
function query(sql, params, callback) {
    // suporta chamada sem params: db.query(sql, callback)
    if (typeof params === 'function') {
        callback = params;
        params = [];
    }

    params = params || [];

    let sqlConvertido = paraPlaceholdersPostgres(sql);

    // Em MySQL, result.insertId vem pronto. No Postgres precisamos pedir
    // explicitamente o id de volta com RETURNING, quando for um INSERT
    // que ainda não tem RETURNING declarado.
    const isInsert = /^\s*insert/i.test(sqlConvertido);
    const jaTemReturning = /returning/i.test(sqlConvertido);

    if (isInsert && !jaTemReturning) {
        sqlConvertido = sqlConvertido.replace(/;?\s*$/, ' RETURNING id;');
    }

    pool.query(sqlConvertido, params)
        .then((resultado) => {
            const linhas = resultado.rows;

            if (isInsert) {
                // mimetiza o formato do mysql2: result.insertId
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
