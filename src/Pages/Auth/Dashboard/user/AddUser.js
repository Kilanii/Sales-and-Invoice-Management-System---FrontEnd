import { useEffect, useState } from "react";
import { USER } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";


function AddUser() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      const [errors, setErrors] = useState("");
      const cookie = Cookie();
      function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
      }
    
      const validateName = (name) => {
        const regex = /^[A-Za-z\s]{1,20}$/;
        return regex.test(name) && !name == "";
      };
    
      const validateEmail = (email) => {
        const regex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;
        return regex.test(email) && !email == "";
      };
    
      const validatePassword = (password) => {
        const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
        return regex.test(password) && !password == "";
      };
    
      const validateConfirmPassword = (password, confirmPassword) => {
        return password === confirmPassword;
      };
    
      async function handleSubmit(e) {
        e.preventDefault();
        let errors = {};
    
        if (!validateName(formData.name)) {
          errors.name =
            "Le nom est obligatoire et doit comporter uniquement des lettres et des espaces, avec une longueur maximale de 20 caractères.";
        }
    
        if (!validateEmail(formData.email)) {
          errors.email = "L'email est obligatoire et doit être au format correct.";
        }
    
        if (!validatePassword(formData.password)) {
          errors.password =
            "Le mot de passe doit contenir entre 6 et 15 caractères, avec au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.";
        }
    
        if (!validateConfirmPassword(formData.password, formData.confirmPassword)) {
          errors.confirmPassword = "Les mots de passe ne correspondent pas.";
        }
    
        if (Object.keys(errors).length === 0) {
          try {
            await Axios.post(`${USER}/add`, formData);
            console.log("success");
            alert("Vous êtes Inscrit");
            setFormData({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
          } catch (error) {
            if (error.response.status === 422) {
              errors.email = "Email is already been taken for this Username";
            } else {
              setErrors("Internal Serveur Erreur");
            }
          }
          const combinedErrors = { ...errors };
          setErrors(combinedErrors);
        } else {
          setErrors(errors);
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
        onChange={handleChange}
        required
      />
      <label for="email">Email</label>
      <input
        placeholder="Email"
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleChange}
        required
      />
      <label for="password">Password</label>
      <input
        placeholder="Password"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handleChange}
        required
      />
      <button disabled={Object.keys(errors).length > 0 ? false : true} type="submit" className="btn btn-primary">
        Save modifications
      </button>
    </form>
  );
}
export default AddUser;
