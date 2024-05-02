import {useEffect, useState } from "react";
import {GetCategories, updateCategory } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import { useParams } from "react-router-dom";


function UpdateCategory() {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [name, setName] = useState('');

  useEffect(() => {
    Axios.get(`/category/${GetCategories}/${id}`)
      .then((response) => {
        setName(response.data.data.name);
      })
      .catch((error) => console.log(error));
  }, [id]);
  
  console.log(name);
  console.log(category);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`/category/${updateCategory}/${id}`,{name:name}   );
      alert("Succeful");
      window.location.pathname = "dashboard/categories";
      console.log('Catégorie mise à jour avec succès:');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Formulaire d'inscription</h1>
      
      <label htmlFor="name">Category New Name</label>
      <input
        placeholder="Category New Name"
        type="text" 
          id="categoryName" 
          value={name} 
          onChange={handleChange}
      />
      
      <button type="submit" className="btn btn-primary">
        Save modifications
      </button>
    </form>
  );
}

export default UpdateCategory;
