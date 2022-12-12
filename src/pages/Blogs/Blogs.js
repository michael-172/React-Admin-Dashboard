import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutline, DeleteOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import { deleteService, getServices } from "../../store/servicesSlice";
import Swal from "sweetalert2";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { getBlogs } from "../../store/blogsSlics";

const Services = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/Login");
    }
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const { blogs } = useSelector((state) => state);
  const Blogs = blogs.Blogs;

  const getServiceFunction = (id) => {
    dispatch(getServices(id));
  };

  const handleDelete = (serviceFromParam) => {
    Swal.fire({
      title: `Do you want to Delete this Blog ?`,
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

  const columns = [
    { field: "blogId", headerName: "ID", width: 90 },

    { field: "title", headerName: "Blog Title", width: 200 },
    { field: "createdAt", headerName: "Blog Creation Date", width: 200 },
    { field: "serviceId", headerName: "Realted Service", width: 200 },

    {
      field: "Blog Describtion",
      headerName: "Blog Describtion",
      width: 150,
      renderCell: (params) => {
        return params?.row?.blogSubTiitles?.map((el) => (
          <p>{el.description}</p>
        ));
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
              rows={Blogs}
              getRowId={(row) => row.blogId}
              disableSelectionOnClick
              columns={columns}
              pageSize={15}
              rowsPerPageOptions={[10]}
              checkboxSelection
            />
          </div>
          <Link to="/AddBlog">
            <button className="btn btn-primary" style={{ margin: "15px 0px" }}>
              Add New Blog
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Services;
