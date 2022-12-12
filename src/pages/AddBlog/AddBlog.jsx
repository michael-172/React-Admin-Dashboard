import "./AddBlog.css";
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

import { addClients } from "../../store/ClientsSlice";
import axios from "axios";
import ErrorModal from "../../components/Errors Modal/ErrorModal";
import Swal from "sweetalert2";

export default function CreateClient() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  /******************************Bootstrap Modal*****************************/
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /******************************Bootstrap Modal*****************************/

  const [desc, setDesc] = useState("");
  const [BlogImage, setBlogImage] = useState();
  const [BlogTitle, setBlogTitle] = useState();
  const serviceId = useRef();
  const [Errors, setErrors] = useState([]);
  const [result, setResult] = useState("");

  const formData = new FormData();
  let errors = [];
  let TestingErrors = [];
  const submitHandler = async (e) => {
    e.preventDefault();
    formData.append("Title", BlogTitle);
    formData.append("MainImageFile", BlogImage);
    formData.append("subDescription", "This is Sub Describtion Added By Me");
    formData.append("subDescription", "");
    formData.append("ServiceId", serviceId.current.value);
    formData.append("subTiitles", "");
    formData.append("BlogImagesFiles", BlogImage);

    if (!desc) {
      errors.push("Describtion is required");
    }
    if (serviceId === "Choose a service") {
      errors.push("Service is Required");
    }
    if (!BlogImage) {
      errors.push("Client Image is Required");
    }

    const finalErrors = new Set(errors);
    const errorsArray = [...finalErrors];
    console.log(errorsArray);

    if (errorsArray.length === 0) {
      const addClient = async () => {
        axios
          .post("http://abnuur-001-site1.btempurl.com/api/Blogs", formData)
          .then(function (response) {
            if (response.status == 201) {
              setResult("Blog Added Succesfully");
              setShow(true);
              document.querySelector(".imageUpload").value = "";
            }
          })
          .catch(function (error) {
            alert(error.response);
          });
      };

      await addClient();
    } else {
      alert(errorsArray);
    }
  };

  const { services } = useSelector((state) => state.services);
  return (
    <>
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />

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

        <div className="newUser">
          <h1 className="newUserTitle">Add New Blog</h1>
          <div className="newUserForm">
            <form onSubmit={submitHandler}>
              <div className="newUserItem">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Blog Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Bolg Title"
                    required={"required"}
                    onChange={(e) => {
                      setBlogTitle(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formFile" className="">
                  <Form.Label>Blog Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => {
                      setBlogImage(e.target.files[0]);
                    }}
                    className="imageUpload"
                    required={"required"}
                  />
                </Form.Group>
              </div>

              <Form.Group controlId="formFile" className="mt-3">
                <Form.Label>Blog Describtion</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                  required={"required"}
                  rows={8}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />{" "}
              </Form.Group>

              <div className="newUserItem mt-3">
                <Form.Select
                  aria-label="Default select example"
                  ref={serviceId}
                >
                  <option value="Choose a service">
                    This Blog is related to :{" "}
                  </option>

                  {services.length > 0 &&
                    services.map((el, idx) => (
                      <option value={el.servieId} key={idx}>
                        {el.name}
                      </option>
                    ))}
                </Form.Select>
              </div>

              <input
                type="submit"
                className=" btn btn-primary mt-3 "
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
