import { configureStore } from "@reduxjs/toolkit";
// import user from "./usersSlice";
import services from "./servicesSlice";
import about from "./servicesSlice";
import clients from "./ClientsSlice";

export const store = configureStore({ reducer: { services, about, clients } });
