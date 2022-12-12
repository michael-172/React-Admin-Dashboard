import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutline, DeleteOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import { deleteService, getServices } from "../../store/servicesSlice";
import { productRows } from "../../dummyData";
import Swal from "sweetalert2";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { deleteClient, getClients } from "../../store/ClientsSlice";

const Clients = () => {
  const [data, setData] = useState(productRows);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const { clients } = useSelector((state) => state.clients);

  const handleDelete = (serviceFromParam) => {
    Swal.fire({
      title: `Do you want to Delete this service <b> ${serviceFromParam.clientId} </b> ?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success");
        dispatch(deleteClient(serviceFromParam));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const columns = [
    { field: "clientId", headerName: "ID", width: "40" },
    { field: "name", headerName: "Client Name", width: "400" },
    { field: "logo", headerName: "Description", width: "400" },

    {
      field: "Client Image",
      headerName: "Client Image",
      width: "100",
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.description} alt="" />
            
          </div>
        );
      },
    },

    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/Clients/" + params.row.clientId}>
              <button
                className="userListEdit"
                // onClick={() => {
                //   dispatch(getUser(params.row));
                // }}
              >
                Edit
              </button>
            </Link>
            <DeleteOutlined
              className="userListDelete"
              onClick={() => {
                handleDelete(params.row);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <div className="userList">
            <DataGrid
              rows={clients}
              getRowId={(row) => row.clientId}
              disableSelectionOnClick
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
            />
          </div>
          <Link to="/CreateClient">
            <button className="btn btn-primary" style={{ margin: "15px 0px" }}>
              Add New Client
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Clients;
