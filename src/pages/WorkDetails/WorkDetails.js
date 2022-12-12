import React, { useEffect } from "react";
import "./WorkDetails.css";
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

const WorkDetails = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/Login");
    }
  });

  const params = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWork(params.id));
  }, [dispatch]);

  const { work } = useSelector((state) => state.work);

  return (
    <>
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="user">
          <div className="top-container">
            <h3 className="userTitle">Work Details</h3>
            <Link to="/CreateService">
              <button className="create">Create New Work</button>
            </Link>
          </div>

          <div className="userWrapper">
            <div className="smallWidget">
              <div className="top">
                <h4 className="title">ID: {work && work.id}</h4>
                <h4 className="title">Title: {work && work.title}</h4>

                <span>Related Service: {work.serviceId}</span>
                <span>Related Work: {work.clientId}</span>
              </div>
            </div>
            <div className="largeWidget">
              <h3 className="SmallHeading">Work Image</h3>
              <div className="largeWedgitWrapper">
                <div className="form">
                  <div className="imagesWrapper">
                    {work?.workImages?.map((el, idx) => (
                      <img
                        src={el}
                        width={300}
                        height={300}
                        alt={"Huawei"}
                        style={{ maxWidth: "100%" }}
                        key={idx}
                      />
                    ))}
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

export default WorkDetails;
