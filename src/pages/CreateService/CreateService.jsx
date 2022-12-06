import "./CreateService.css";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { addService } from "../../store/servicesSlice";
import Axios from "axios";
import { ErrorOutlined } from "@mui/icons-material";

export default function NewUser() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const { isInserted } = useSelector((state) => state.user);

  const formData = new FormData();

  const mainImageChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0] && e.target.files[0]) {
      formData.append("MainImageFile", e.target.files[0]);
    }
  };
  const ServiceImagesHandler = (e) => {
    for (let i = 0; i < e.target.files.length; i++)
      formData.append("ServiceImages", e.target.files[i]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    formData.append("Name", name);
    formData.append("Description", desc);

    dispatch(addService(formData));
  };

  return (
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
  );
}
