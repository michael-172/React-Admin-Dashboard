import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setuser } from "../../store/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      navigate("/");
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const login = async () => {
      axios
        .post("http://abnuur-001-site1.btempurl.com/api/Auth/login", {
          email: email,
          password: password,
        })
        .then(function (response) {
          if (response.status == 200) {
            console.log(response.data);
            window.localStorage.setItem("token", response.data.token);
            window.localStorage.setItem("id", response.data.userId);
            window.localStorage.setItem("userName", response.data.username);
            window.localStorage.setItem("role", response.data.roles[0]);
            dispatch(setuser(response.data));
            navigate("/");
          }
        })
        .catch(function (error) {
          alert(error.response.data);
        });
    };

    await login();
  };
  return (
    <div className="LoginForm">
      <Container>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Link className="forgetPass">Forget Password ?</Link>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
