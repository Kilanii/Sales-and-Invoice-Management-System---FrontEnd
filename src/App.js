import SignIn from "./Pages/Auth/Auth/signin";
import SignUp from "./Pages/Auth/Auth/signup";
import Home from "./Home";
import Dashboard from "./Pages/Auth/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Addcategory from "./Pages/Auth/Dashboard/category/CreateCategory";
import Categories from "./Pages/Auth/Dashboard/category/categories";
import Managecategory from "./Pages/Auth/Dashboard/category/UpdateCategory";
function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<SignIn />}/>
          <Route path="signup" element={<SignUp />}/>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="categories" element={<Categories />} />
            <Route path="AddCategory" element={<Addcategory />} />
            <Route path="categories/:id" element={<Managecategory/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
