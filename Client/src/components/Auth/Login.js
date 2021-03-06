import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import axios from "axios";
import "./form.css";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      console.log("Please enter all fields danger");
    } else {
      axios
        .post("users/login", {
          email: user.email,
          password: user.password,
        })
        .then()
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          window.location.replace("/StockRow");
        })
        .catch((err) => console.error("Login Error:" + err.message));
    }
  };

  return (
    <div className="Login">
      <form onSubmit={onSubmit}>
        <h1>Alpha Finance</h1>
        <h2>Login</h2>
        <hr></hr>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            onChange={onChange}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            onChange={onChange}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <ButtonToolbar>
          <Button
            href="/portfolio"
            onSubmit={onSubmit}
            variant="primary"
            type="submit"
            className="mr-3"
            size="lg"
          >
            Login
          </Button>
          <br></br>
          Don't have an account yet?
          <Button
            href="/signup"
            onSubmit={onSubmit}
            variant="primary"
            size="lg"
          >
            Register
          </Button>
        </ButtonToolbar>
      </form>
    </div>
  );
};

export default Login;
