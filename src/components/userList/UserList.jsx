import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline, DeleteOutlined} from '@mui/icons-material';
import { userRows } from "../../dummyData";
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from "react";
import { getUsers } from "../../store/usersSlice";
import { deleteUser } from "../../store/usersSlice";
import { getUser } from "../../store/usersSlice";

export default function UserList() {


    const dispatch = useDispatch();
    useEffect(() => {dispatch(getUsers())}, [dispatch]);
    const {isLoading, users} = useSelector((state) => state.user);


    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'user', headerName: 'User', width: 200, renderCell: (params) => {
            return (
                <div className="userListUser">
                    <img className="userListImg" src={params.row.avatar} alt="" />
                    {params.row.username}
                </div>
            )
        } },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'status',
            headerName: 'status',
            width: 120,
        },
        {
            field: 'transaction',
            headerName: 'Transaction Volume',
            width: 160,
        },
        {
            field: 'action',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => {
                return(
                    <>
                    <Link to={'/users/'+params.row.id}>
                    <button className="userListEdit" onClick={() => {dispatch(getUser(params.row))}}>Edit</button>
                    </Link>
                    <DeleteOutlined className="userListDelete" onClick={() => {dispatch(deleteUser(params.row))}}/>
                    </>
                )
            }
        },
        ];
    

    return (
    <div className="userList">
        <DataGrid rows={users} disableSelectionOnClick columns={columns} pageSize={15} rowsPerPageOptions={[5]} checkboxSelection/>
    </div>
    )
}
