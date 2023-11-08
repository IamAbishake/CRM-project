
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import SideBar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import About from "./Components/About";
import Order from "./Components/Order";
import Product from "./Components/Product";
import Customer from "./Components/Customer";
import Layout from "./Components/Layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Dashboard/>} />
            <Route path="/Customer" element={<Customer />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/About" element={<About />} />
          </Route>
          <Route path="/login" element={<div>this is login</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
