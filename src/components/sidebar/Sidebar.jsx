import "./sidebar.css";
import {   LineStyle,
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
    Report, } from "@mui/icons-material";

    import { Link } from 'react-router-dom';
    
export default function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                <Link to='/' className="link">
                <li className="sidebarListItem">
                    <LineStyle className="sidebarIcon" />
                    <span className="text">Home</span>
                </li>
                </Link>
                <li className="sidebarListItem">
                    <Timeline className="sidebarIcon" />
                    <span className="text">Analytics</span>
                </li>
                <li className="sidebarListItem">
                    <TrendingUp className="sidebarIcon" />
                    <span className="text">Sales</span>
                </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Quick Menu</h3>
                <ul className="sidebarList">

                    <Link to='/users' className="link">
                        <li className="sidebarListItem">
                        <PermIdentity className="sidebarIcon" />
                        <span className="text">Users</span>
                        </li>
                    </Link>
                    
                    <Link to='/products' className="link">
                    <li className="sidebarListItem">
                    <Storefront className="sidebarIcon" />
                    <span className="text">Products</span>
                    </li>
                    </Link>


                <li className="sidebarListItem">
                    <AttachMoney className="sidebarIcon" />
                    <span className="text">Transactions</span>
                </li>
                <li className="sidebarListItem">
                    <BarChart className="sidebarIcon" />
                    <span className="text">Reports</span>
                </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Notifications</h3>
                <ul className="sidebarList">
                <li className="sidebarListItem">
                    <MailOutline className="sidebarIcon" />
                    <span className="text">Mail</span>
                </li>
                <li className="sidebarListItem">
                    <DynamicFeed className="sidebarIcon" />
                    <span className="text">Feedback</span>
                </li>
                <li className="sidebarListItem">
                    <ChatBubbleOutline className="sidebarIcon" />
                    <span className="text">Messages</span>
                </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Staff</h3>
                <ul className="sidebarList">
                <li className="sidebarListItem">
                    <WorkOutline className="sidebarIcon" />
                    <span className="text">Manage</span>
                </li>
                <li className="sidebarListItem">
                    <Timeline className="sidebarIcon" />
                    <span className="text">Analytics</span>
                </li>
                <li className="sidebarListItem">
                    <Report className="sidebarIcon" />
                    <span className="text">Reports</span>
                </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
