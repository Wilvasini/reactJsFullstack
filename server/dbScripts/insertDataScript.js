const fs = require("fs");
const { parse } = require("csv-parse");
const sqlite3 = require('sqlite3').verbose();

const mapData = require('./mapData.json');

const test = {};
const test1 = {};

const db = new sqlite3.Database('womencrimes.db');

const insertDBData = [];
fs.createReadStream("./CrimesOnWomenData.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
        row[0] = Number(row?.[0]);
        row[2] = Number(row?.[2]);
        row[3] = Number(row?.[3]);
        row[4] = Number(row?.[4]);
        row[5] = Number(row?.[5]);
        row[6] = Number(row?.[6]);
        row[7] = Number(row?.[7]);
        row[8] = Number(row?.[8]);
        row[9] = Number(row?.[9]);
        let hcKey = null;
        mapData?.features?.forEach((data) => {
            if(row?.[1]?.trim()?.toLowerCase() === data?.properties?.['woe-name']?.trim()?.toLocaleLowerCase() ){
                hcKey = data?.properties?.['hc-key'];
            }
        });
        row?.push(hcKey);
        insertDBData?.push(row);
    })
    .on("end", function () {
        let query =
            "INSERT INTO crimes (id,statename, year,rape, ka,dd, aow,aom,dv,wt,mapkey) " +
            "VALUES (?, ?, ? ,?,?, ?, ? ,?,?,?,?)";

        let statement = db.prepare(query);


        for (var i = 0; i < insertDBData.length; i++) {
            statement.run(insertDBData[i], function (err) {
                if (err) throw err;
            });
        }

        statement.finalize();
        const sql = `SELECT * FROM crimes`; 
        db.all(sql, [], (err, rows) => {
            if (err) return console.error(err.message);
        });
        console.log("finished");
    })
    .on("error", function (error) {
        console.log(error.message);
    });
