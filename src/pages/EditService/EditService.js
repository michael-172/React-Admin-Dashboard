import React, { useEffect } from "react";
import "./user.css";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationSearchingOutlinedIcon from "@mui/icons-material/LocationSearchingOutlined";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getServices } from "../../store/servicesSlice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Editservices = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/Login");
    }
  });

  const params = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServices(params.id));
  }, [dispatch]);

  const { services } = useSelector((state) => state.services);

  return (
    <div className="user">
      <div className="top-container">
        <h3 className="userTitle">Service Details</h3>
        <Link to="/CreateService">
          <button className="create">Create New Service</button>
        </Link>
      </div>

      <div className="userWrapper">
        <div className="smallWidget">
          <div className="top">
            <img
              src={services && services.mainImage}
              alt=""
              className="userImg"
            />
            <div className="smallWidgetText">
              <span>{services && services.name}</span>
              <span className="title">{services && services.title}</span>
              <span></span>
            </div>
          </div>

          <div className="center">
            <span className="subTitle">Service Details</span>
            <ul className="infoList">
              <li>
                <PersonOutlineOutlinedIcon className="icon" />
                <span className="info">{services && services.name}</span>
              </li>
              {/* <li>
                <CalendarTodayOutlinedIcon className="icon" />
                <span className="info">{services && services.birthdate}</span>
              </li> */}
            </ul>

            <img
              src={services && services.mainImage}
              alt=""
              className="bigmainImage"
            />
            <ul className="infoList">
              {/* <li>
                <PhoneAndroidOutlinedIcon className="icon" />
                <span className="info">{services && services.phone}</span>
              </li>
              <li>
                <EmailOutlinedIcon className="icon" />
                <span className="info">{services && services.email}</span>
              </li> */}
              {/* <li>
                <LocationSearchingOutlinedIcon className="icon" />
                <span className="info">{services && services.location}</span>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="largeWidget">
          <h3 className="SmallHeading">Details</h3>
          <div className="largeWedgitWrapper">
            <div className="form">
              <form
                action=""
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="userUpdateItem">
                  <label>name</label>
                  <span type="text">{services && services.name}</span>
                </div>

                <div className="userUpdateItem">
                  <label>Describtion</label>
                  <span type="text">{services && services.description}</span>
                </div>

                {/* <div className="userUpdateItem">
                  <label>Phone</label>
                  <input type="text" placeholder={services && services.phone} />
                </div>

                <div className="userUpdateItem">
                  <label>Adress</label>
                  <input
                    type="text"
                    placeholder={services && services.location}
                  />
                </div> */}
              </form>
              <div className="imagesWrapper">
                {services?.serviceImagesURL?.map((el, idx) => (
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
  );
};

export default Editservices;
