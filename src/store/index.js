import { configureStore } from "@reduxjs/toolkit";
// import user from "./usersSlice";
import services from "./servicesSlice";
import about from "./servicesSlice";
import clients from "./ClientsSlice";
import user from "./userSlice";
import work from "./workSlice";
import blogs from "./blogsSlics";

export const store = configureStore({
  reducer: { services, about, clients, user, work, blogs },
});
