import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@mui/icons-material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setuser } from "../../store/userSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      dispatch(setuser());
    }
  });
  const { user } = useSelector((state) => state);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem">
                <LineStyle className="sidebarIcon" />
                <span className="text">Home</span>
              </li>
            </Link>

            <Link to="/Services" className="link">
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                <span className="text">Services</span>
              </li>
            </Link>

            {user.role === "SuperAdmin" && (
              <Link to="/Add_User" className="link">
                <li className="sidebarListItem">
                  <GroupAddIcon className="sidebarIcon" />
                  <span className="text">Add user </span>
                </li>
              </Link>
            )}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/Work" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                <span className="text">Work</span>
              </li>
            </Link>

            <Link to="/Clients" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                <span className="text">Clients</span>
              </li>
            </Link>
            {/* 
            <Link to="/About" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                <span className="text">About</span>
              </li>
            </Link> */}

            <Link to="/Blogs" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                <span className="text">Blogs</span>
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">More Tools</h3>
          <ul className="sidebarList">
            <Link to="/CreateService" className="link">
              <li className="sidebarListItem">
                <DesignServicesIcon className="sidebarIcon" />
                <span className="text">Add Service</span>
              </li>
            </Link>
            <Link to="/CreateClient" className="link">
              <li className="sidebarListItem">
                <DomainAddIcon className="sidebarIcon" />
                <span className="text">Add Client</span>
              </li>
            </Link>
            <Link to="/CreateClient" className="link">
              <li className="sidebarListItem">
                <AddHomeWorkIcon className="sidebarIcon" />
                <span className="text">Add Work</span>
              </li>
            </Link>
            <Link to="/AddBlog" className="link">
              <li className="sidebarListItem">
                <AutoStoriesIcon className="sidebarIcon" />
                <span className="text">Add Blog</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
