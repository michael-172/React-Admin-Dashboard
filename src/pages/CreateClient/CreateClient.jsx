import "./CreateClient.css";
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
  const { services } = useSelector((state) => state.services);

  /******************************Bootstrap Modal*****************************/
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /******************************Bootstrap Modal*****************************/

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [clientImage, setClientImage] = useState();
  const [serviceId, setServiceId] = useState();
  const [Errors, setErrors] = useState([]);

  const formData = new FormData();
  let errors = [];
  let TestingErrors = [];
  const submitHandler = async (e) => {
    e.preventDefault();
    formData.append("Name", name);
    formData.append("LogoImage", clientImage);
    formData.append("description", desc);
    formData.append("ServiceId", serviceId);

    if (!desc) {
      errors.push("Describtion is required");
    }
    if (serviceId === "Choose a service") {
      errors.push("Service is Required");
    }
    if (!clientImage) {
      errors.push("Client Image is Required");
    }

    const finalErrors = new Set(errors);
    const errorsArray = [...finalErrors];
    console.log(errorsArray);

    if (errorsArray.length === 0) {
      const addClient = async () => {
        axios
          .post("http://abnuur-001-site1.btempurl.com/api/Clients", formData)
          .then(function (response) {
            if (response.status == 201) {
              alert("Client Added Succesfully");
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

  return (
    <>
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />

        {/* Bootstrap Modal */}

        {/* Bootstrap Modal */}

        <div className="newUser">
          <h1 className="newUserTitle">Add New Client</h1>
          <div className="newUserForm">
            <form onSubmit={submitHandler}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Client Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ex: Vodafone Egypt"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>

              <div className="newUserItem">
                <Form.Group controlId="formFile" className="">
                  <Form.Label>Client Image</Form.Label>
                  <Form.Control
                    type="file"
                    required={'required'}
                    className="imageUpload"
                    onChange={(e) => {
                      setClientImage(e.target.files[0]);
                    }}
                  />
                </Form.Group>
              </div>

              <div className="newUserItem">
                <label>Client Describtion</label>
                <textarea
                  type="text"
                  placeholder="john"
                  rows={8}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="newUserItem">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    setServiceId(e.target.value);
                  }}
                >
                  <option value="Choose a service">Choose a service</option>

                  {services.length > 0 &&
                    services.map((el, idx) => (
                      <option value={el.servieId} key={idx}>
                        {el.name}
                      </option>
                    ))}
                </Form.Select>
              </div>

              <input type="submit" className="newUserButton" value="Create" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
