import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Reg.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { setuser } from "../../store/userSlice";
import Modal from "react-bootstrap/Modal";

const Reg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      dispatch(setuser());
    }
  });
  const { user } = useSelector((state) => state);

  useEffect(() => {
    if (user.role === "DataEntry") {
      navigate("/");
    }
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const login = async () => {
      axios
        .post("http://abnuur-001-site1.btempurl.com/api/Auth/register", {
          firstName: firstName,
          lastName: lastName,
          username: userName,
          email: email,
          password: password,
          roles: [
            {
              name: "DataEntry",
            },
          ],
        })
        .then(function (response) {
          if (response.status == 200) {
            window.localStorage.setItem("token", response.data.token);
            setShow(true);
          }
        })
        .catch(function (error) {
          alert(error.response.data);
        });
    };

    await login();
  };
  return (
    <>
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="LoginForm" style={{ flex: "1" }}>
          <Container>
            {/* /*******************Bootstrap Modal */}

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Addin User</Modal.Title>
              </Modal.Header>
              <Modal.Body>User added succussfully</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            {/* /*******************Bootstrap Modal */}
            <Form onSubmit={submitHandler}>
              <h2>Add New User</h2>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  required
                  onChange={(e) => {
                    setfirstName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  required
                  onChange={(e) => {
                    setlastName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  required
                  onChange={(e) => {
                    setuserName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
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
                    setpassword(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Link className="forgetPass" to="/forget">
                  Forget Password ?
                </Link>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Reg;
