import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";


function TableShow(header , data) {
  const headerShow = header.map((header, key) => (
    <th key={key}>
      {header.name}
    </th>
  ))  
  const dataShow = data.map((item, key) => (
    <tr key={key}>
      <td>{item.name}</td>
      <td>
        <div className="d-flex align-items-center gap-2">
            <Link to={`${item.id}`}>
              <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare}/>
            </Link>
            <FontAwesomeIcon 
            onClick={() => delete(item.id)}
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
  );
}

export default TableShow;
