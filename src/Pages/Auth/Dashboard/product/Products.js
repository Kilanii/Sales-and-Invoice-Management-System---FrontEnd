import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteproduct } from "../../../../Api/Api";


function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get(`${products}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);

  async function handleDelete(id) {
    try {
      await Axios.delete(`/product/${deleteproduct}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const header = [
    { 
        key: "name", 
        name: "name" 
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
const headerShow = header.map((header, key) => (
  <th key={key}>
    {header.name}
  </th>
))
const dataShow = products.map((item, key) => (
  <tr key={key}>
    <td>{item.name}</td>
    <td>{item.status}</td>
    <td>
      <div className="d-flex align-items-center gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare}/>
          </Link>
          <FontAwesomeIcon 
          onClick={() => handleDelete(item.id)}
          fontSize={"19px"}
          color="red"
          cursor={"pointer"}
          icon={faTrash}
          />
      </div>
    </td>
  </tr>
))

  return (
    <div classname="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products Page</h1>
        <Link className="btn btn-primary" to="/dashboard/AddProduct">
          Add Product
        </Link>
      </div>
      <Table className="table table-striped">
        <thead>
          <tr>
            {headerShow}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataShow.lenghth ===0 ? <tr>Loading...</tr> : dataShow}
        </tbody>
      </Table>    
      </div>
  );
}

export default Product;
