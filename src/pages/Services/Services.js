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

const Services = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/Login");
    }
  });

  const [data, setData] = useState(productRows);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const handleDelete = (serviceFromParam) => {
    Swal.fire({
      title: `Do you want to Delete this service <b> ${serviceFromParam.name} </b> ?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success");
        dispatch(deleteService(serviceFromParam));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const { services } = useSelector((state) => state.services);

  const columns = [
    { field: "servieId", headerName: "ID", width: 90 },
    {
      field: "Service",
      headerName: "Service",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.mainImage} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: "400" },

    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/Services/" + params.row.servieId}>
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
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="userList">
            <DataGrid
              rows={services}
              getRowId={(row) => row.servieId}
              disableSelectionOnClick
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
            />
          </div>
          <Link to="/CreateService">
            <button className="btn btn-primary" style={{ margin: "15px 0px" }}>
              Add New Service
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Services;
