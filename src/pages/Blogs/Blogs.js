import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutline, DeleteOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import { deleteService, getServices } from "../../store/servicesSlice";
import { productRows } from "../../dummyData";
import Swal from "sweetalert2";

const Services = () => {
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
  );
};

export default Services;