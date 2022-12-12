import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutline, DeleteOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import { deleteService, getServices } from "../../store/servicesSlice";
import { productRows } from "../../dummyData";
import Swal from "sweetalert2";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { deleteWork, getIndividualWork, getWork } from "../../store/workSlice";
import { getClients, getOneClient } from "../../store/ClientsSlice";

const Work = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/Login");
    }
  });

  const [data, setData] = useState(productRows);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWork());

  }, [dispatch]);

  const { work } = useSelector((state) => state.work);



  const handleDelete = (work) => {
    Swal.fire({
      title: `Do you want to Delete this service <b> ${work.title} </b> ?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success");
        dispatch(deleteWork(work));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };


  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    {
      field: "Work Image",
      headerName: "Work Image",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.workImages[0]} alt="" />
          </div>
        );
      },
    },
    { field: "title", headerName: "Name", width: 400},
    { field: "clientId", headerName: "Client ID", width: 200},
    { field: "serviceId", headerName: "Related Service ID", width: 200},


    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/Work/" + params.row.id}>
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
              rows={work}
              getRowId={(row) => row.id}
              disableSelectionOnClick
              columns={columns}
              pageSize={15}
              rowsPerPageOptions={[10]}
              checkboxSelection
            />
            </div>
          <Link to="/CreateWork">
            <button className="btn btn-primary" style={{ margin: "15px 0px" }}>
              Add New Work
            </button>
          </Link>
          </div>
        </div>
    </>
  );
};

export default Work;
