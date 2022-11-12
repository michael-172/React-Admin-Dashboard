import './widgetsm.css';
import {Visibility} from '@mui/icons-material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../store/usersSlice'

export default function WidgetSm() {

  const dispatch = useDispatch();
  useEffect(() => {dispatch(getUsers(5))}, [dispatch])

  const {users, isLoading} = useSelector( (state) => state.user);



  const usersList = users.map( (user) => {
    return(
      <li className='smallWidgetListItem' key={user.id}>
      <img className='avatar' src={user.avatar} alt="" />
      <div className="smallWidgetText">
          <span className='name'>{user.username}</span>
          <span className='title'>{user.title}</span>
      </div>
      <button className='action'>
          <Visibility />
          Display
      </button>
  </li>
    )
})

  return (
    <div className='smWidget'>
      
      <h3 className="smallWidgetTitle">New Join Members</h3>
      
      {(usersList.length > 0) ? <ul className='smallWidgetList'> {usersList} </ul> : <div className="lds-ripple"><div></div><div></div></div>}


    
    </div>
  )
}
