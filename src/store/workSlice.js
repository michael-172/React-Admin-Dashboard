import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getWork = createAsyncThunk(
  "work/getAllWork",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://abnuur-001-site1.btempurl.com/api/Work`);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getIndividualWork = createAsyncThunk(
  "work/getWork",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        `http://abnuur-001-site1.btempurl.com/api/Work/${id}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addWork = createAsyncThunk(
  "work/addWork",
  async (formData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://abnuur-001-site1.btempurl.com/api/Work", {
        method: "POST",
        body: formData,
      }).then((response) => {
        if (response.status === 201) {
          // alert("work added succusfully")
        }
      });
    } catch (error) {
      alert(rejectWithValue(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWork = createAsyncThunk(
  "work/deleteWork",
  async (work, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://abnuur-001-site1.btempurl.com/api/Work/${work.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return work;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const workSlice = createSlice({
  name: "Work",
  initialState: { work: [], addingWorkLoadingStatus: null, indiviualWork: [] },
  extraReducers: {
    //add work
    [addWork.pending]: (state, action) => {
      state.addingWorkLoadingStatus = true;
      state.isLoading = true;
    },
    [addWork.fulfilled]: (state, action) => {
      state.addingWorkLoadingStatus = false;
    },
    [addWork.rejected]: (state, action) => {
      state.addingWorkLoadingStatus = false;
    },

    //get work
    [getWork.pending]: (state, action) => {
      state.addingWorkLoadingStatus = true;
    },
    [getWork.fulfilled]: (state, action) => {
      state.addingWorkLoadingStatus = false;
      state.work = action.payload;
    },
    [getWork.rejected]: (state, action) => {
      state.isLoading = false;
    },

    // Delete
    [deleteWork.fulfilled]: (state, action) => {
      state.work = state.work.filter((el) => el.id !== action.payload.id);
    },
  },
});

export default workSlice.reducer;
