import "./featuredinfo.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../store/servicesSlice";
import { Link } from "react-router-dom";
import { getClients } from "../../store/ClientsSlice";
import { getBlogs } from "../../store/blogsSlics";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
export default function FeaturedInfo() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServices());
    dispatch(getClients());
    dispatch(getBlogs());
  }, [dispatch]);

  const { services } = useSelector((state) => state.services);
  const { clients } = useSelector((state) => state.clients);
  const { Blogs } = useSelector((state) => state.blogs);
  console.log(Blogs);
  return (
    <div className="featured">
      <div className="featuredItem">
        <Link
          to="/Services"
          style={{ textDecoration: "none", color: "#0A58CA" }}
        >
          <span className="featuredTitle">Services</span>
          <div
            className="featuredMoneyContainer"
            style={{ justifyContent: "space-between" }}
          >
            <span className="featuredMoney">{services.length}</span>
            <span className="featuredMoneyRate"></span>
            <MiscellaneousServicesIcon
              style={{ height: "93px", width: "auto" }}
            />
          </div>
          <span className="featuredSub">Click Here to see more details</span>
        </Link>
      </div>

      <Link to="/Clients" style={{ textDecoration: "none", color: "#0A58CA" }}>
        <div className="featuredItem">
          <span className="featuredTitle">Clients</span>
          <div
            className="featuredMoneyContainer"
            style={{ justifyContent: "space-between" }}
          >
            <span className="featuredMoney">{clients.length}</span>

            <span className="featuredMoneyRate"></span>
            <PeopleAltIcon style={{ height: "93px", width: "auto" }} />
          </div>
          <span className="featuredSub">Click Here to see more details</span>
        </div>{" "}
      </Link>

      <Link to="/Blogs" style={{ textDecoration: "none", color: "#0A58CA" }}>
        <div className="featuredItem">
          <span className="featuredTitle">Blogs</span>
          <div
            className="featuredMoneyContainer"
            style={{ justifyContent: "space-between" }}
          >
            <span className="featuredMoney">{Blogs.length}</span>
            <span className="featuredMoneyRate"></span>
            <MenuBookIcon style={{ height: "93px", width: "auto" }} />
          </div>
          <span className="featuredSub">Click here to see more details</span>
        </div>
      </Link>
    </div>
  );
}
