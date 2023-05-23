const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

const saltRounds = 10;

const app = express();
app.use(express.json());

//important configuration for sessions
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "register",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 300000, // 5 minutes in milliseconds
    },
  })
);

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

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO registration (name,email,password) VALUES (?,?,?)",
      [username, useremail, hash],
      (err, result) => {
        if (err) {
          console.log(err);
          res.json(err);
        }
        res.json("Successfull!");
      }
    );
  });
});

// api for session
app.get("/login", (req, res) => {
  //to check of user is logged in or not
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const useremail = req.body.useremail;
  const password = req.body.password;
  console.log(useremail, password);
  db.query(
    "SELECT * FROM registration WHERE email = ?",
    useremail,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send("Wrong password combination");
          }
        });
      }
    }
  );
});

app.get("/", (req, res) => {
  db.query("SELECT * FROM registration", (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    }
    res.send(result);
    console.log(result);
  });
});

app.listen(3001, () => {
  console.log("Server up and running");
});
