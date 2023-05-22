import React from "react";
import { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [res, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", {
        useremail: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.data[0].name);
        setResponse(response.data[0].name);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  };
  return (
    <>
      {res ? (
        <Alert variant="success">Welcome {res}</Alert>
      ) : (
        <Alert variant="warning">Wrong Combination</Alert>
      )}

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
          style={{ border: "1px solid grey", padding: "15px 15px" }}
        >
          <div style={{ margin: "15px " }}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              style={{ padding: "10px 15px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              style={{ padding: "10px 15px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            style={{ margin: "15px", padding: "10px 15px", display: "flex" }}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
