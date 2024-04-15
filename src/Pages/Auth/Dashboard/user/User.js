import { useEffect, useState } from "react";
import { USER } from "../../../../Api/Api";
import axios from "axios";
import { Axios } from "../../../../Api/axios";
import { useParams } from "react-router-dom";

function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(true);
  const {id} = useParams();
    useEffect(() => {
    Axios.get(`${USER}/${id}`).then((data) => {
      setName(data.data.name);
      setEmail(data.data.email);
    }).then(() => setDisable(false));
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post(`${USER}/${id}`, {
        name: name,
        email: email,
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
        placeholder="User Name"
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label for="email">Email</label>
      <input
        placeholder="Email"
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button disabled={disable} type="submit" className="btn btn-primary">
        Save modifications
      </button>
    </form>
  );
}
export default User;
