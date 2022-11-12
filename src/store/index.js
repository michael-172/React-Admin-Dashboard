import { configureStore } from "@reduxjs/toolkit";
import user from "./usersSlice";

export const store = configureStore({reducer: {user} });