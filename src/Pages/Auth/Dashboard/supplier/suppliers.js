import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetSupplier, deleteSupplier } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";



function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    Axios.get(`/supplier/${GetSupplier}`)
      .then((data) => setSuppliers(data.data.data.suppliers))
      .catch((error) => console.log(error));
  }, []);

  async function handleDelete(id) {
    try {
      await Axios.delete(`/supplier/${deleteSupplier}/${id}`);
      setSuppliers((prevSuppliers) =>
        prevSuppliers.filter((supplier) => supplier.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  }
console.log(suppliers);
  const header = [
    { key: "supplier_name", name: "Name" },
    { key: "contact", name: "Contact" },
    { key: "address", name: "Address" },
  ];
  const headerShow = header.map((header, key) => (
    <th key={key}>
      {header.name}
    </th>
  ))
  const dataShow = suppliers.map((item, key) => (
    <tr key={key}>
      <td>{item.suplier_name}</td>
      <td>{item.contact}</td>
      <td>{item.address}</td>
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
        <h1>Suppliers Page</h1>
        <Link className="btn btn-primary" to="/dashboard/CreateSupplier">
          Add Supplier
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

export default Suppliers;