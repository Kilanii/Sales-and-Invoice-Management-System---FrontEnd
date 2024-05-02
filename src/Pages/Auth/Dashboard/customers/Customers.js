import { useEffect, useState } from "react";
import { GetCustomers, deleteCustomer } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Customers() {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    Axios.get(`/customer/${GetCustomers}`)
      .then((data) => setCustomer(data.data.data))
      .catch((err) => console.log(err));
  }, []);

  async function handleDelete(id) {
    try {
      await Axios.delete(`/customer/${deleteCustomer}/${id}`);
      setCustomer((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }
  const header = [
    { key: "id", name: "id" },
    { key: "name", name: "Username" },
    { key: "email", name: "Email" },
  ];

  const headerShow = header.map((header, key) => (
    <th key={key}>{header.name}</th>
  ));
  const dataShow = customer.map((item, key) => (
    <tr key={key}>
      <td>{item.name}</td>
      <td>{item.status}</td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
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
  ));

  return (
    <div classname="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Customers Page</h1>
        <link className="btn btn-primary" to="/dashboard/category/add">
          Add Customers
        </link>
      </div>
      <Table className="table table-striped">
        <thead>
          <tr>
            {headerShow}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{dataShow.lenghth === 0 ? <tr>Loading...</tr> : dataShow}</tbody>
      </Table>
    </div>
  );
}

export default Customers;
