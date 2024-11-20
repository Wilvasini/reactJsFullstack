const sqlite3 = require('sqlite3').verbose();

function getAllCrimes(){
    const db = new sqlite3.Database('womencrimes.db');
    return new Promise((resolve,reject) => {
        db.all('SELECT * FROM crimes WHERE mapkey IS NOT NULL', (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
   
}

function getCrimesByState(mapkey){
    const db = new sqlite3.Database('womencrimes.db');
    return new Promise((resolve,reject) => {
        db.all('SELECT * FROM crimes WHERE mapkey = ?',mapkey, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
   
}

module.exports = {
    getAllCrimes,
    getCrimesByState
};