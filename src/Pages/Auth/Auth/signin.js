import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../App.css";
import "../../../index.css";
import "../../../signup_signin.css";
import { LOGIN, baseUrl } from "../../../Api/Api";
import Cookie from "cookie-universal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Axios } from "../../../Api/axios";
function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const cookie = Cookie();
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await Axios.post(`/auth/${LOGIN}`,formData
      );
      const token = result.data.data.token;
      localStorage.setItem("usertoken", token);
      cookie.set("usertoken", token)
      // Redirect to dashboard
     window.location.pathname = "dashboard";
    } catch (error) {
      if (error.response.status === 401) {
        setErrors("Mauvais e-mail ou mot de passe");
      } else {
        setErrors("Erreur de serveur interne");
      }
    }
  }
  return (
    <>
      <section className="material-half-bg">
        <div className="cover"></div>
      </section>
      <section className="login-content">
        <div className="logo">
          <h2>Sales and Invoice System</h2>
        </div>
        <div className="login-box">
          <form className="login-form" onSubmit={handleSubmit}>
            <input type="hidden" name="_token" value="{{ csrf_token() }}" />
            <h3 className="login-head">
              <FontAwesomeIcon icon={faUser} className="fa fa-lg fa-fw" />
              &nbsp;LOG IN
            </h3>
            <div className="form-group">
              <label className="control-label">Email</label>
              <input
                id="email"
                type="email"
                className={`form-control ${errors ? "is-invalid" : ""}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoFocus
              />
              {errors && (
                <span className="invalid-feedback" role="alert">
                  {errors}
                </span>
              )}
            </div>
            <div className="form-group">
              <label className="control-label">Password</label>
              <input
                id="password"
                type="password"
                className={`form-control ${errors ? "is-invalid" : ""}`}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors && (
                <span className="invalid-feedback" role="alert">
                  {errors}
                </span>
              )}
            </div>
            <div className="form-group btn-container">
              <button
                className="btn btn-primary btn-block signbtn"
                type="submit"
              >
                <FontAwesomeIcon icon={faSignIn} className="fa-lg fa-fw" />
                &nbsp;LOG IN
              </button>
            </div>
            <footer>
              <a href="/signup">Create account</a>
            </footer>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignIn;
