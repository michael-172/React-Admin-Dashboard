import React, { useEffect } from "react";
import "./ClientDetails.css";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationSearchingOutlinedIcon from "@mui/icons-material/LocationSearchingOutlined";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getWork, getwork } from "../../store/workSlice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import getIndividualWork from "../../store/workSlice";
import { getClients, getOneClient } from "../../store/ClientsSlice";

const ClientDetails = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/Login");
    }
  });

  const params = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClients(params.id));
  }, [dispatch]);

  const { clients } = useSelector((state) => state.clients);

  return (
    <>
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="user">
          <div className="top-container">
            <h3 className="userTitle">Client Details</h3>
            <Link to="/CreateService">
              <button className="create">Add New Client</button>
            </Link>
          </div>

          <div className="userWrapper">
            <div className="smallWidget">
              <div className="top">
                <h4 className="title">ID: {clients && clients.clientId}</h4>
                <h4 className="title">Name: {clients && clients.name}</h4>

                <span>Related Service: {clients.serviceName}</span>

                <p className="mt-3">
                  <i>{clients.logo}</i>
                </p>
              </div>
            </div>
            <div className="largeWidget">
              <h3 className="SmallHeading">client Image</h3>
              <div className="largeWedgitWrapper">
                <div className="form">
                  <div className="imagesWrapper">
                    <img
                      src={clients.description}
                      width={"auto"}
                      height={"auto"}
                      alt={"Huawei"}
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientDetails;
