import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import UserList from "./components/userList/UserList";
import "./app.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import User from "./components/user/User";
import ProductList from "./components/productList/ProductList";
import Product from "./pages/createProduct/Product";
import Services from "./pages/Services/Services";
import Clients from "./pages/Clients/Clients";
import Sections from "./pages/Sections/Sections";
import Work from "./pages/Work/Work";
import About from "./pages/About/About";
import EditServices from "./pages/EditService/EditService";
import CreateService from "./pages/CreateService/CreateService";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateClient from "./pages/CreateClient/CreateClient";
import Blogs from "./pages/Blogs/Blogs";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Router>

        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/newProduct" element={<Product />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Services/:id" element={<EditServices />} />
          <Route path="/CreateService" element={<CreateService />} />
          <Route path="/Clients" element={<Clients />} />
          <Route path="/CreateClient" element={<CreateClient />} />
          <Route path="/Sections" element={<Sections />} />
          <Route path="/Work" element={<Work />} />
          <Route path="/About" element={<About />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;
