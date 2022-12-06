import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topbarLeft">
          <Link to="/" className="link">
            <img src={"/assets/Asset 9.svg"} alt="logo" width={150} />
          </Link>
        </div>
        <div className="topbarRight">
          <div className="iconsContainer">
            <NotificationsNone />
            <span className="topIconBag">2</span>
          </div>
          <div className="iconsContainer">
            <Language />
            <span className="topIconBag">2</span>
          </div>
          <div className="iconsContainer">
            <Settings />
          </div>
          <img className="topAvatar" src="/assets/2.jpeg" />
        </div>
      </div>
    </div>
  );
}
