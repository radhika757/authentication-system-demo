import React, { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(password);

    axios
      .post("http://localhost:3001/register", {
        username: name,
        useremail: email,
        password: password,
      })
      .then((res) => {
        console.log("Response created");
        setUser("User created");
      });
  };

  return (
    <>
      <Alert variant="success" className="p-2">{user}</Alert>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ border: "1px solid grey", padding: "40px 30px" }}
        >
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
