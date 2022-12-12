import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "useSlice",
  initialState: { userName: "", id: " ", role: "" },
  reducers: {
    setuser(state) {
      state.userName = window.localStorage.getItem("userName");
      state.id = window.localStorage.getItem("id");
      state.role = window.localStorage.getItem("role");
    },
  },
});

export const { setuser } = userSlice.actions;
export default userSlice.reducer;
