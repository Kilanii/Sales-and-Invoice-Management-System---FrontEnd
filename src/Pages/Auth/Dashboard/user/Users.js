import { useEffect, useState } from "react";
import { USER } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import Table from "../../../../Components/Table";

function Users() {
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);

  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, [deleteUser]);

  async function handleDelete(id) {
    try {
      await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }
  const header = [
    { key: "id", name: "id" },
    { key: "name", name: "Username" },
    { key: "email", name: "Email" },
  ];

  return (
    <div classname="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Customers Page</h1>
        <link className="btn btn-primary" to="/dashboard/category/add">
          Add Customers
        </link>
      </div>
      <Table header={header} data={users} delete={handleDelete} />
    </div>
  );
}

export default Users;
