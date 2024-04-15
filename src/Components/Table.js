import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Table({ header, data, delete: handleDelete}) {  

const headerShow = header.map((item) => <th key={item.key}>{item.name}</th>);
// Body Show
const dataShow = data.map((item, key) => (
  <tr key={key}>
    <td>{key + 1}</td>
    {header.map((item2, key2) => (
      <td key={key2}>{item[item2.key]}</td>
    ))}
    <td>
      <div className="d-flex align-items-center gap-2">
        <Link to={`${item.id}`}>
          <FontAwesomeIcon icon={faPenToSquare} fontSize={"19px"} />
        </Link>
        <FontAwesomeIcon
          onClick={() => handleDelete(item.id)}
          icon={faTrash}
          fontSize={"19px"}
          color="red"
          cursor={"pointer"}
        />
      </div>
    </td>
  </tr>
));

// Affichage
return (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>id</th>
        {headerShow}
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.length === 0 && (
        <tr text-align="center">
          <td colSpan={header.length + 2}>Loading..</td>
        </tr>
      )}
      {dataShow}
    </tbody>
  </table>
);

}
export default Table;
