import "./featuredinfo.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../store/servicesSlice";
import { Link } from "react-router-dom";
import { getClients } from "../../store/ClientsSlice";

export default function FeaturedInfo() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServices());
    dispatch(getClients());
  }, [dispatch]);

  const { services } = useSelector((state) => state.services);
  const { clients } = useSelector((state) => state.clients);
  console.log(clients);
  return (
    <div className="featured">
      <div className="featuredItem">
        <Link to="/Services">
          <span className="featuredTitle">Services</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{services.length}</span>
            <span className="featuredMoneyRate">
              <ArrowDownwardIcon className="featuredIcon negative" />{" "}
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </Link>
      </div>

      <Link to="/Clients">
        <div className="featuredItem">
          <span className="featuredTitle">Clients</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{clients.length}</span>

            <span className="featuredMoneyRate">
              <ArrowDownwardIcon className="featuredIcon negative" />{" "}
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>{" "}
      </Link>

      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$1,415</span>
          <span className="featuredMoneyRate">
            +11.4 <ArrowUpwardIcon className="featuredIcon positive" />{" "}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
