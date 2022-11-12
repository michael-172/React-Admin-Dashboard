import "./createUser.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import {insertUser} from '../../store/usersSlice';
import { useSelector } from "react-redux";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function NewUser() {


  const dispatch = useDispatch();

  const username = useRef(null);
  const title = useRef(null);
  const email =    useRef(null);
  const password = useRef(null);
  const phone =    useRef(null);
  const address =  useRef(null);
  const active =   useRef(null);


const submitHandler = (e) => {
  e.preventDefault();

  const userData = {
    username: username.current.value,
    title: title.current.value,
    email: email.current.value,
    status: active.current.value,
    avatar: '/assets/7.jpeg',
    transaction: '$150',
  }
    dispatch(insertUser(userData));
}

const {isInserted} = useSelector((state) => state.user)

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <Stack sx={{ width: '100%' }} spacing={2}>
      
      {(isInserted) && <Alert severity="success">User Created Successfully</Alert>}
      </Stack>
      <form className="newUserForm" onSubmit={submitHandler}>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="john" ref={username} required/>
        </div>
        <div className="newUserItem">
          <label>title</label>
          <input type="text" placeholder="John Smith" ref={title} required/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" ref={email} required/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" ref={password} required/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" ref={phone} required/>
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" ref={address} required/>
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" ref={active} required/>
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <input type='submit' className="newUserButton" value='Create'/>
      </form>
    </div>
  );
}