import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getClients = createAsyncThunk(
  "clients/getClients",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        `http://freejob-001-site1.atempurl.com/api/Clients`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addClients = createAsyncThunk(
  "clients/addClient",
  async (formData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        "http://freejob-001-site1.atempurl.com/api/Clients",
        {
          method: "POST",
          body: formData,
        }
      ).then((response) => {
        if (response.status === 201) {
        }
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteClient = createAsyncThunk(
  "client/deleteClient",
  async (client, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(
        `http://freejob-001-site1.atempurl.com/api/Clients/${client.clientId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      return client;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const clientsSlice = createSlice({
  name: "users",
  initialState: { clients: [], isLoading: null },
  extraReducers: {
    //get Services
    [getClients.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getClients.fulfilled]: (state, action) => {
      state.clients = action.payload;
    },
    [getClients.rejected]: (state, action) => {
      state.isLoading = false;
    },

    // Delete
    [deleteClient.fulfilled]: (state, action) => {
      state.clients = state.clients.filter(
        (el) => el.clientId !== action.payload.clientId
      );
    },
  },
});

export default clientsSlice.reducer;
