const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();
const corsOptions = {
  origin: ["http://localhost:5173"],
};
const womencrimes = require("./services/WomenCrimes");

app.use(cors(corsOptions));

app.get("/getAllCrimes", (req, res) => {
  womencrimes?.getAllCrimes()?.then((data) =>{
    res.json(data);
  });
});

app.get("/getCrimesByState/:id", (req, res) => {
  womencrimes?.getCrimesByState(req?.params?.id)?.then((data) =>{
    res.json(data);
  });
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
