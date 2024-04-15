import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../App.css";
import "../../../index.css";
import "../../../signup_signin.css";
import Cookie from "cookie-universal";
import { REGISTER } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import axios from "axios";


function Signup() {
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
        const result = await axios.post(`http://127.0.0.1:8000/api/auth/register`, formData);
        console.log("success");
        alert("Vous êtes Inscrit");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        console.log(result.data.data);
        const token = result.data.data.token;
        console.log("Token before setting:", token);
        localStorage.setItem('usertoken', token);
        const storedToken = localStorage.getItem('usertoken');
        console.log("Token after retrieval:", storedToken);
        cookie.set("usertoken", token);
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
