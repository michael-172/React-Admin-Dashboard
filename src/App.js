import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import UserList from "./components/userList/UserList";
import './app.css'
import {BrowserRouter as Router} from "react-router-dom";
import { Routes ,Route } from 'react-router-dom';
import User from "./components/user/User";
import CreateUser from "./pages/createUser/CreateUser";
import ProductList from "./components/productList/ProductList";
import Product from "./pages/createProduct/Product";

function App() {
  return (

    <Router>
      <Topbar /> 
      <div className='container'>
      <Sidebar />

      <Routes>
        <Route path='/' element={<Home/>} exact/>
        <Route path='/users' element={<UserList/>} />
        <Route path='/users/:userId' element={<User/>}/>
        <Route path='/newUser' element={<CreateUser/>}/>
        <Route path='/products' element={<ProductList/>}/>
        <Route path='/newProduct' element={<Product/>}/>
      </Routes>

      </div>
    </Router>

  );
}

export default App;
