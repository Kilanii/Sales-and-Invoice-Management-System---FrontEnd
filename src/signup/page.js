import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Assurez-vous d'avoir le fichier CSS de style
import "../index.css";
import "../signup_signin.css";


function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateName = (name) => {
    const regex = /^[A-Za-z\s]{1,20}$/;
    return regex.test(name);
  };

  const validateEmail = (email) => {
    const regex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
    return regex.test(password);
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password === confirmPassword)
    return True;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!validateName(formData.name)) {
      errors.name = "Le nom est obligatoire et doit comporter uniquement des lettres et des espaces, avec une longueur maximale de 20 caractères.";
    }

    if (!validateEmail(formData.email)) {
      errors.email = "L'email est obligatoire et doit être au format correct.";
    }

    if (!validatePassword(formData.password)) {
      errors.password = "Le mot de passe doit contenir entre 6 et 15 caractères, avec au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.";
    }

    if (!validateConfirmPassword(formData.password, formData.confirmPassword)) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    if (Object.keys(errors).length === 0) {
      // Envoyer le formulaire si aucune erreur de validation
      alert("Vous êtes Inscrit:")
      console.log("Formulaire valide:", formData);
      // Réinitialiser le formulaire après l'envoi des données
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      // Afficher les erreurs de validation
      setErrors(errors);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      let errors = {};
    
      // Validation des données
    
      if (Object.keys(errors).length === 0) {
        try {
          const response = await fetch("", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            console.log("Inscription réussie !");
          } else {
            console.error("Erreur lors de l'inscription:", response.statusText);
          }
        } catch (error) {
          console.error("Erreur lors de la requête:", error.message);
        }
    
        // Réinitialiser le formulaire après l'envoi des données
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        // Afficher les erreurs de validation
        setErrors(errors);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center formu">
        <div className="col-md-8">
          <div className="card">
            <header>
              <span>S'inscrire</span>
              <a href="/signin"><button type="submit" className="btn btn-outline-primary">
                S'identifier
              </button></a>
              
            </header>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <label htmlFor="name">Name</label>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="email">E-Mail Address</label>
                  <div className="col-md-12">
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="password">Password</label>
                  <div className="col-md-12">
                    <input
                      type="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="password-confirm">Confirm Password</label>
                  <div className="col-md-12">
                    <input
                      type="password"
                      className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                      id="password-confirm"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <button
                      id="submit"
                      type="submit"
                      className="btn btn-primary"
                    >
                      S'inscrire{" "}
                    </button>
                  </div>
                </div>
                <p id="politique">
                  En cliquant sur le bouton ‹‹S'isnscrire››, vous confirmez que
                  vous acceptez nos conditions d'utilisation et notre politique
                  de confidentialité.
                </p>
              </form>
              <footer>
                <span>Avoir un compte?&nbsp;</span>
                <a href="/signin" className="link-primary">S'identifier</a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
