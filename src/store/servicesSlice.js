import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getServices = createAsyncThunk(
  "services/getServices",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = id
        ? await fetch(
            `http://abnuur-001-site1.btempurl.com/api/Services/${id}`
          )
        : await fetch(`http://abnuur-001-site1.btempurl.com/api/Services`);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addService = createAsyncThunk(
  "services/addService",
  async (formData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        "http://abnuur-001-site1.btempurl.com/api/Services",
        {
          method: "POST",
          body: formData,
        }
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (service, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(
        `http://abnuur-001-site1.btempurl.com/api/Services/${service.servieId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      return service;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const servicesSlice = createSlice({
  name: "users",
  initialState: { services: [] },
  extraReducers: {
    //get Services
    [getServices.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getServices.fulfilled]: (state, action) => {
      state.services = action.payload;
    },
    [getServices.rejected]: (state, action) => {
      state.isLoading = false;
    },

    // Delete
    [deleteService.fulfilled]: (state, action) => {
      state.services = state.services.filter(
        (el) => el.servieId !== action.payload.servieId
      );
    },
  },
});

export default servicesSlice.reducer;
