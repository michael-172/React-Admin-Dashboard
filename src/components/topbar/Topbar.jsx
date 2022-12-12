import React, { useEffect } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelect } from "@mui/base";
import { useDispatch, useSelector } from "react-redux";
import { setuser } from "../../store/userSlice";

export default function Topbar() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      dispatch(setuser());
    }
  }, [dispatch]);
  const { user } = useSelector((state) => state);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    setAnchorEl(null);
    window.localStorage.removeItem("token");
    navigate("/Login");
  };

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
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <span>
                Welcome <b>{user?.userName}</b> (
                {user.role ? user.role : "Test"})
              </span>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
