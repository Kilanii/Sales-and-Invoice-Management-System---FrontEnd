import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../../../Components/Table";
import axios from "axios";

function Categories() {
  const [category, setcategory] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/category/get-categories`)
      .then((data) => setcategory(data.data))
      .catch((err) => console.log(err));
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/update-category/${id}`);
      setcategory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const header = [{ key: "title", name: "title" }];

  return (
    <div classname="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>category Page</h1>
        <Link className="btn btn-primary" to="/dashboard/AddCategory">
          Add category
        </Link>
      </div>
      <Table header={header} data={category} delete={handleDelete} />
    </div>
  );
}

export default Categories;
