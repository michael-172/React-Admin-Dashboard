import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBlogs = createAsyncThunk(
  "Blogs/getBlogs",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://abnuur-001-site1.btempurl.com/api/Blogs`);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "Blogs/deleteBlog",
  async (blog, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://abnuur-001-site1.btempurl.com/api/Blogs/${blog.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return blog;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const blogSlice = createSlice({
  name: "Blogs",
  initialState: { Blogs: [] },
  extraReducers: {
    //get blogs
    [getBlogs.fulfilled]: (state, action) => {
      state.Blogs = action.payload;
    },

    // Delete
    [deleteBlog.fulfilled]: (state, action) => {
      state.work = state.work.filter((el) => el.id !== action.payload.id);
    },
  },
});

export default blogSlice.reducer;
