import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import { userAnalytics } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import "./home.css"

export default function Home() {
    return (
    <div className="home">
        <FeaturedInfo />
        <Chart title="User Analytics" dataKey="Active user" data={userAnalytics} grid/>
        <div className="homeWidgets">
            <WidgetSm/>
            <WidgetLg />
        </div>
    </div>
    )
}
