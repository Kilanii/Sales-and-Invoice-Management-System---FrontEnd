import SignIn from "./Pages/Auth/Auth/signin";
import SignUp from "./Pages/Auth/Auth/signup";
import Home from "./Home";
import Dashboard from "./Pages/Auth/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Addcategory from "./Pages/Auth/Dashboard/category/CreateCategory";
import Categories from "./Pages/Auth/Dashboard/category/categories";
import Suppliers from "./Pages/Auth/Dashboard/supplier/suppliers";
import CreateSupplier from "./Pages/Auth/Dashboard/supplier/CreateSupplier";
import UpdateSupplier from "./Pages/Auth/Dashboard/supplier/UpdateSupplier";
import UpdateCategory from "./Pages/Auth/Dashboard/category/UpdateCategory";
import Customers from "./Pages/Auth/Dashboard/customers/Customers";
import AddCustomer from "./Pages/Auth/Dashboard/customers/AddCustomer";
import UpdateCustomer from "./Pages/Auth/Dashboard/customers/UpdateCustomer";
import AddProduct from "./Pages/Auth/Dashboard/product/AddProduct";
import UpdateProduct from "./Pages/Auth/Dashboard/product/manageProduct";
import Product from "./Pages/Auth/Dashboard/product/products";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<SignIn />}/>
          <Route path="signup" element={<SignUp />}/>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="customers" element={<Customers />} />
            <Route path="CreateSupplier" element={<AddCustomer />} />
            <Route path="suppliers/:id" element={<UpdateCustomer/>}/>
            <Route path="categories" element={<Categories />} />
            <Route path="AddCategory" element={<Addcategory />} />
            <Route path="categories/:id" element={<UpdateCategory/>}/>
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="CreateSupplier" element={<CreateSupplier />} />
            <Route path="suppliers/:id" element={<UpdateSupplier/>}/>
            <Route path="products" element={<Product />} />
            <Route path="AddProduct" element={<AddProduct />} />
            <Route path="suppliers/:id" element={<UpdateProduct/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
