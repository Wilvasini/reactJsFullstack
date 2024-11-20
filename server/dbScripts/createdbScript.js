const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('womencrimes.db');

const createTableSql = `
    CREATE TABLE IF NOT EXISTS crimes (
        id INTEGER PRIMARY KEY NOT NULL,
        StateName TEXT,
        Year INTEGER,
        Rape INTEGER,
        KA INTEGER,
        DD INTEGER,
        AOW INTEGER,
        AOM INTEGER,
        DV INTEGER,
        WT INTEGER,
        MAPKEY TEXT
    )`;

db.run(createTableSql, (err) => {
    if (err) {
        return console.error('Error creating table:', err.message);
    }
    console.log('Table created successfully');
});