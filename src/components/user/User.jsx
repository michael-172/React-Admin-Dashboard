import "./user.css";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'


export default function User() {

    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.user);
    userInfo && console.log(userInfo.username);
    
return (
    <div className="user">
        <div className="top-container">
        <h3 className="userTitle">Edit User</h3>
        <Link to="/newUser">
            <button className="create">Create</button>
        </Link>
        </div>

        <div className="userWrapper">
            <div className="smallWidget">
                <div className="top">
                    <img src={userInfo && userInfo.avatar} alt="" className="userImg"/>
                    <div className="smallWidgetText">
                        <span>{userInfo && userInfo.username}</span>
                        <span className="title">{userInfo && userInfo.title}</span>
                        <span></span>
                    </div>
                </div>

                <div className="center">
                    <span className="subTitle">Account Details</span>
                    <ul className="infoList">
                        <li>
                            <PersonOutlineOutlinedIcon className='icon'/>
                            <span className="info">{userInfo && userInfo.username}</span>
                        </li>
                        <li>
                            <CalendarTodayOutlinedIcon className='icon'/>
                            <span className="info">{userInfo && userInfo.birthdate}</span>
                        </li>
                    </ul>

                    <span className="subTitle">Contact Details</span>
                    <ul className="infoList">
                        <li>
                            <PhoneAndroidOutlinedIcon className='icon'/>
                            <span className="info">{userInfo && userInfo.phone}</span>
                        </li>
                        <li>
                            <EmailOutlinedIcon className='icon'/>
                            <span className="info">{userInfo && userInfo.email}</span>
                        </li>
                        <li>
                            <LocationSearchingOutlinedIcon className='icon'/>
                            <span className="info">{userInfo && userInfo.location}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="largeWidget">
                    <h3 className="SmallHeading">Edit</h3>
                <div className="largeWedgitWrapper">
                    <div className="form">
                        <form action="">
                        <div className="userUpdateItem">
                            <label>Username</label>
                            <input type="text" placeholder={userInfo && userInfo.username}/>
                        </div>

                        <div className="userUpdateItem">
                            <label>Full Name</label>
                            <input type="text" placeholder={userInfo && userInfo.username}/>
                        </div>

                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input type="text" placeholder={userInfo && userInfo.email}/>
                        </div>

                        <div className="userUpdateItem">
                            <label>Phone</label>
                            <input type="text" placeholder={userInfo && userInfo.phone}/>
                        </div>

                        <div className="userUpdateItem">
                            <label>Adress</label>
                            <input type="text" placeholder={userInfo && userInfo.location}/>
                        </div>
                        
                        </form>
                    </div>
                    <div className="additional">
                        <img src={userInfo && userInfo.avatar} alt="" className="bigAvatar"/>
                        <button className="update">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
