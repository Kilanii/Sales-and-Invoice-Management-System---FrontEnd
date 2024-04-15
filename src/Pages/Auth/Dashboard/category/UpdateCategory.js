import { useEffect, useState } from "react";
import {UpdateCategory } from "../../../../Api/Api";

import { Axios } from "../../../../Api/axios";
import { useParams } from "react-router-dom";

function Managecategory() {
  const [name, setName] = useState("");
  const [disable, setDisable] = useState(true);

  const {id} = useParams();

  useEffect(() => {
    Axios.get(`http://127.0.0.1:8000/api/update-category/${id}`)
      .then((data) => {
        setName(data.data.name);
      })
      .then(() => setDisable(false));
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post(`http://127.0.0.1:8000/api/update-category/${id}`, {
        name: name,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Formulaire d'inscription</h1>
      <label for="name">User Name</label>
      <input
        placeholder="Category Name"
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button disabled={disable} type="submit" className="btn btn-primary">
        Save modifications
      </button>
    </form>
  );
}
export default Managecategory;
