import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../../../Components/Table";
import axios from "axios";

function Categories() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/supplier/get-supplier`)
      .then((data) => setSuppliers(data.data))
      .catch((err) => console.log(err));
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/supplier/update-supplier/${id}`);
      setSuppliers((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const header = [{ key: "title", name: "title" }];

  return (
    <div classname="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Suppliers Page</h1>
        <Link className="btn btn-primary" to="/dashboard/CreateSupplier">
          Add Supplier
        </Link>
      </div>
      <Table header={header} data={suppliers} delete={handleDelete} />
    </div>
  );
}

export default Categories;
