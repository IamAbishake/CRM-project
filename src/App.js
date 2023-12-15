
import "./index.css";
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import User from "./Components/users/User";
import Adduser from "./Components/users/Adduser";
import Updateuser from "./Components/users/Updateuser";
import Layout from "./Components/Layout";
import Dashboard from "./Components/Dashboard";
import Customer from "./Components/Customer";
import About from "./Components/About";
import Product from "./Components/products/Product";
import Addproduct from "./Components/products/Addproduct";
import Updateproduct from "./Components/products/Updateproduct";
import Updateorder from "./Components/orders/Updateorder";
import Addorder from "./Components/orders/Addorder";
import Orders from "./Components/orders/Orders";
import Login from "./Components/Login"

function App() {
  

  return (
    <div className="App">
       
      <div>
      <BrowserRouter>
      <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route element={<Layout/>}>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/Customer" element={<Customer/>}/>
          <Route path="/Orders" element={<Orders/>}/>
          <Route path="/Product" element={<Product/>}/>
          <Route path="/Product/Addproduct" element={<Addproduct/>}/>
          <Route path="/Product/updateproduct/:id" element={<Updateproduct/>}/>
          <Route path="/User" element={<User/>}/>
          <Route path="/Customer/Adduser" element={<Adduser/>}/>
          <Route path="/Customer/Edit/:id" element={<Updateuser/>}/>
          <Route path="/Orders/Addorder" element={<Addorder/>}/>
          <Route path="/Orders/updateorder/:id" element={<Updateorder/>}/>
          <Route path="/About" element={<About/>}/>
         </Route>
      </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
