const db = require('./database/connection');

db.query('SELECT 1 + 1 AS resultado', (err, results) => {
    if (err) {
        console.log(err);
    } else {
        console.log(results);
    }
});