import "./CreateService.css";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { addService } from "../../store/servicesSlice";
import Axios from "axios";
import { ErrorOutlined } from "@mui/icons-material";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Form, Modal, Button } from "react-bootstrap";

import axios from "axios";

export default function NewUser() {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [result, setResult] = useState("");

  const { isInserted } = useSelector((state) => state.user);

  const mainImageChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0] && e.target.files[0]) {
      formData.append("MainImageFile", e.target.files[0]);
    }
  };

  const formData = new FormData();
  let errors = [];
  let TestingErrors = [];

  const ServiceImagesHandler = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("ServiceImages", e.target.files[i]);
      console.log(e.target.files[i]);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    formData.append("Name", name);
    formData.append("Description", desc);

    if (!name) {
      errors.push("title is required");
    }
    if (!desc) {
      errors.push("title is required");
    }

    const finalErrors = new Set(errors);
    const errorsArray = [...finalErrors];
    console.log(errorsArray);

    if (errorsArray.length === 0) {
      const addClient = async () => {
        axios
          .post("http://abnuur-001-site1.btempurl.com/api/Services", formData)
          .then(function (response) {
            if (response.status == 201) {
              setShow(true);
              setResult("Service Created Succesfully");
              document.querySelector(".imageUpload").value = "";
            }
            if (response.status == 400) {
              setShow(true);
              setResult("Please Check All Fields");
            }
          })
          .catch(function (error) {
            console.log(error.response.data.errors);
            setResult("Service Created Succesfully");
          });
      };

      await addClient();
    } else {
      alert(errorsArray);
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
          <h1 className="newUserTitle">Create New Service</h1>
          <Stack sx={{ width: "100%" }} spacing={2}>
            {isInserted && (
              <Alert severity="success">User Created Successfully</Alert>
            )}
          </Stack>
          <form className="newUserForm" onSubmit={submitHandler}>
            <div className="newUserItem">
              <label>Service Name</label>
              <input
                type="text"
                placeholder="john"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={"required"}
              />
            </div>
            <div className="newUserItem">
              <label>Service Describtion</label>
              <input
                type="text"
                placeholder="John Smith"
                required={"required"}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="newUserItem">
              <label>Main Image</label>
              <input
                type="file"
                name="file-upload"
                onChange={mainImageChange}
                required={"required"}
                className="imageUpload"
              />
            </div>

            <div className="newUserItem">
              <label>Sub Images</label>
              <input
                type="file"
                name="file-upload"
                multiple
                onChange={ServiceImagesHandler}
                required={"required"}
              />
            </div>

            <input type="submit" className="newUserButton" value="Create" />
          </form>
        </div>
      </div>
    </>
  );
}
