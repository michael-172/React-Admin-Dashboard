// import "./CreateService.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { addService, getServices } from "../../store/servicesSlice";
import Axios from "axios";
import { ErrorOutlined } from "@mui/icons-material";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Form, Modal, Button } from "react-bootstrap";

import axios from "axios";
import { getClients } from "../../store/ClientsSlice";
import { addWork, getWork } from "../../store/workSlice";

export default function NewUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServices());
    dispatch(getClients());
  }, [dispatch]);
  const { services } = useSelector((state) => state.services);
  const { clients } = useSelector((state) => state.clients);
  const { addingWorkLoadingStatus } = useSelector((state) => state.work);
  const { work } = useSelector((state) => state.work);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const service = useRef();
  const client = useRef();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [result, setResult] = useState("");
  const [images, setImages] = useState([]);

  const { isInserted } = useSelector((state) => state.user);

  const formData = new FormData();
  let errors = [];
  let TestingErrors = [];

  const ServiceImagesHandler = (e) => {
    if (e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("WorkImagesFiles", e.target.files[i]);
        console.log(e.target.files[i]);
      }
    } else {
      errors.push("Work Images Is Required.");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    formData.append("Title", title);
    formData.append("ClientId", client.current.value);
    formData.append("ServiceId", service.current.value);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    if (!title) {
      errors.push(`Title is required.`);
    }
    if (service == "Choose a service") {
      errors.push("Service is required.");
    }

    const finalErrors = new Set(errors);
    const errorsArray = [...finalErrors];
    console.log(errorsArray);

    if (errorsArray.length === 0) {
      dispatch(addWork(formData));
      setResult("Work Added Succesfully");
      setShow(true);
      document.querySelector(".imageUpload").value = "";
    } else {
      // alert(errorsArray);
      setResult(errorsArray);
      setShow(true);
    }
  };

  return (
    <>
      {/* /*******************Bootstrap Modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Addin User</Modal.Title>
        </Modal.Header>
        <Modal.Body>{result}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* /*******************Bootstrap Modal */}

      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="newUser">
          <h1 className="newUserTitle">Create New Work</h1>
          <Stack sx={{ width: "100%" }} spacing={2}>
            {isInserted && (
              <Alert severity="success">User Created Successfully</Alert>
            )}
          </Stack>
          <form className="newUserForm" onSubmit={submitHandler}>
            <Form.Group
              className="mb-3 w-100"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Work Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="name@example.com"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 w-100"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Choose a Service</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={service}
                className="w-100"
              >
                {services?.map((el, idx) => (
                  <option value={el.servieId} key={idx}>
                    {el.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3 w-100"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Choose a Client</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={client}
                className="w-100"
              >
                {clients.length > 0 &&
                  clients?.map((el, idx) => (
                    <option value={el.clientId} key={idx}>
                      {el.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3 w-100">
              <Form.Label>Upload Work Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={ServiceImagesHandler}
                required={"required"}
                className="imageUpload"
              />
            </Form.Group>

            <input
              type="submit"
              className="btn btn-primary w-100 mt-2"
              value="Create"
            />
          </form>
        </div>
      </div>
    </>
  );
}
