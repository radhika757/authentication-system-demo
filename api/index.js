const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  port: "3306",
  password: "password",
  database: "authentication",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const useremail = req.body.useremail;
  const password = req.body.password;
  console.log(username, useremail, password);
  db.query(
    "INSERT INTO registration (name,email,password) VALUES (?,?,?)",
    [username, useremail, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json(err);
      }
      res.json("Successfull!");
    }
  );
});

app.post("/login", (req, res) => {
 
  const useremail = req.body.useremail;
  const password = req.body.password;
  console.log(useremail, password);
  db.query(
    "SELECT * FROM registration WHERE email = ? AND password = ?",
    [useremail, password],
    (err, result) => {
      if (err) {
       res.send({err:err});
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({
          message: "Wrong combination",
        });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server up and running");
});
