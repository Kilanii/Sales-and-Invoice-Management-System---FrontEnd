import { useEffect, useState } from "react";
import { category, deleteCategory } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import { Link } from "react-router-dom";
import Table from "../../../../Components/Table";
function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get(`${products}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);

  async function handleDelete(id) {
    try {
      await Axios.delete(`${deleteProduct}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const header = [
    { 
        key: "title", 
        name: "title" 
    },
    { 
        key: "model", 
        name: "model" 
    },
    { 
        key: "serial", 
        name: "serial" 
    },
    { 
        key: "s_price", 
        name: "s_price" 
    },
    { 
        key: "p_price", 
        name: "p_price" 
    },
    { 
        key: "supplier", 
        name: "supplier" 
    },
];

  return (
    <div classname="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products Page</h1>
        <Link className="btn btn-primary" to="/dashboard/AddCategory">
          Add Product
        </Link>
      </div>
      <Table header={header} data={products} delete={handleDelete} />
    </div>
  );
}

export default Products;
