import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../../../Api/axios";
import { GetCategories, deleteCategory } from "../../../../Api/Api";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";


function Categories() {
  const [category, setcategory] = useState([]);

  useEffect(() => {
    Axios.get(`/category/${GetCategories}`)
      .then((data) => setcategory(data.data.data))
      .catch((err) => console.log(err));
  }, []);

  async function handleDelete(id) {
    try {
      await Axios.delete(`/category/${deleteCategory}/${id}`);
      setcategory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }
console.log(category)

const header = [
  { key:"name", name: "Name", },
  { key: "status", name: "Status", },
];


  
  const headerShow = header.map((header, key) => (
    <th key={key}>
      {header.name}
    </th>
  ))
  const dataShow = category.map((item, key) => (
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
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>category Page</h1>
        <Link className="btn btn-primary" to="/dashboard/AddCategory">
          Add category
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

export default Categories;
