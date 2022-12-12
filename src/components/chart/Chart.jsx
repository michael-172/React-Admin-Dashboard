import "./chart.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteClient, getClients } from "../../store/ClientsSlice";
import { Link } from "react-router-dom";
import { DeleteOutline, DeleteOutlined } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";

export default function Chart({ title, data, dataKey, grid }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

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

  const { clients } = useSelector((state) => state.clients);

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
    <div className="chart">
      <h3 className="chartTitle">Our Clients</h3>

      <DataGrid
        className="clientsTable"
        rows={clients}
        getRowId={(row) => row.clientId}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        sx={{
          height: "500px",
        }}
      />
    </div>
  );
}
