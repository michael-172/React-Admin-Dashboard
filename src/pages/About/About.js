import React, { useRef } from "react";
import "./about.css";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationSearchingOutlinedIcon from "@mui/icons-material/LocationSearchingOutlined";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getServices } from "../../store/servicesSlice";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addAbout } from "../../store/AboutSlice";

const About = () => {
  const title = useRef("");
  const text = useRef("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(title.current.value);
    console.log(text.current.value);
    const data = {
      name: title.current.value,
      text: text.current.value,
    };
    dispatch(addAbout(data));
  };
  return (
    <div className="About">
      <Form onSubmit={submitHandler}>
        <Form.Group aria-label="Default select example" className="mb-3">
          <Form.Label>Text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex: Our Mission.."
            ref={title}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Text</Form.Label>
          <Form.Control as="textarea" rows={12} ref={text} />
        </Form.Group>

        <button className="btn btn-primary">Submit</button>
      </Form>
    </div>
  );
};

export default About;
