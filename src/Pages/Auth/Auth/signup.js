import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../App.css";
import "../../../index.css";
import "../../../signup_signin.css";
import Cookie from "cookie-universal";
import { REGISTER } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";


function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const cookie = Cookie();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Réinitialisez les erreurs uniquement pour le champ modifié
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  }

  const validateName = (name) => {
    const regex = /^[A-Za-z\s]{1,20}$/;
    return regex.test(name);
  };

  const validateEmail = (email) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return regex.test(password);
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Effectuer la validation des champs de formulaire
    const validationErrors = {};
    
    if (!validateName(formData.name)) {
      validationErrors.name = "Le nom doit comporter uniquement des lettres et des espaces, avec une longueur maximale de 20 caractères.";
    }

    if (!validateEmail(formData.email)) {
      validationErrors.email = "L'adresse email est invalide.";
    }

    if (!validatePassword(formData.password)) {
      validationErrors.password = "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et une longueur minimale de 6 caractères.";
    }

    if (!validateConfirmPassword(formData.password, formData.confirmPassword)) {
      validationErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    // Si des erreurs de validation sont présentes, mettez à jour l'état des erreurs et arrêtez l'exécution
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Aucune erreur de validation, procéder à l'envoi du formulaire
    try {
      const result = await Axios.post(`/auth/${REGISTER}`, formData);
      console.log("success");
      alert("Inscription réussie !");

      // Réinitialiser les données du formulaire après une inscription réussie
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Stocker le token
      const token = result.data.data.token;
      localStorage.setItem("usertoken", token);
      cookie.set("usertoken", token);

    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Cette adresse email est déjà associée à un compte existant.",
        }));
      } else {
        setErrors("Erreur du serveur. Veuillez réessayer plus tard.");
      }
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center formu">
        <div className="col-md-8">
          <div className="card">
            <header>
              <span>Register</span>
              <a href="/signin">
                <button type="submit" className="btn btn-outline-primary">
                  Sign In
                </button>
              </a>
            </header>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <label htmlFor="name">Name</label>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="email">E-Mail Address</label>
                  <div className="col-md-12">
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="password">Password</label>
                  <div className="col-md-12">
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="password-confirm">Confirm Password</label>
                  <div className="col-md-12">
                    <input
                      type="password"
                      className={`form-control ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      id="password-confirm"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <button
                      id="submit"
                      type="submit"
                      className="btn btn-primary"
                    >
                      Register{" "}
                    </button>
                  </div>
                </div>
                <p id="politique">
                  By clicking the ‹‹Register›› button, you confirm that you
                  accept our terms of use and privacy policy.
                </p>
              </form>
              <footer>
                <span>Have an account?&nbsp;</span>
                <a href="/signin" className="link-primary">
                  Sign In
                </a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
