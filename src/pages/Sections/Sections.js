import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sections = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/Login");
    }
  });
  return <div>Sections</div>;
};

export default Sections;
