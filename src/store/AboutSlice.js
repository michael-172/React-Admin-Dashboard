import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addAbout = createAsyncThunk(
  "about/addAbout",
  async (aboutData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await fetch(
        "http://freejob-001-site1.atempurl.com/api/AboutUs",
        {
          method: "POST",
          body: JSON.stringify(aboutData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getAbout = createAsyncThunk(
  "about/getAbout",
  async (type, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const res = await fetch(
        `http://freejob-001-site1.atempurl.com/api/AboutUs/${type}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const aboutSlice = createSlice({
  name: "aboutSlice",
  initialState: { about: [] },
  extraReducers: {},
});

export default aboutSlice.reducer;
