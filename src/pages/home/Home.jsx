import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import { userAnalytics } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/Login");
    }
  });
  return (
    <>
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="home">
          <FeaturedInfo />
          <Chart
            title="User Analytics"
            dataKey="Active user"
            data={userAnalytics}
            grid
          />
          <div className="homeWidgets">
            {/* <WidgetSm/>
            <WidgetLg /> */}
          </div>
        </div>
      </div>
    </>
  );
}
