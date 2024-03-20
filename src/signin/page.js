import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Assurez-vous d'avoir le fichier CSS de style
import "../index.css";
import "../signup_signin.css";


function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://votrebackend.com/api/login", {
        // Remplacez 'http://votrebackend.com/api/login' par l'URL de votre endpoint d'authentification dans Laravel
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Si la connexion réussit (statut 200), redirigez l'utilisateur vers une autre page ou affichez un message de succès
        console.log("Connexion réussie !");
      } else {
        // Si la connexion échoue, affichez un message d'erreur ou gérez l'erreur en conséquence
        console.error("Identifiants incorrects !");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="sign_in_container">
        <div className="row justify-content-center formu">
          <div className="col-md-8 cadre">
            <div className="card">
              <header>
                <span>S'inscrire</span>
              </header>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label htmlFor="email">E-Mail Address</label>
                    <div className="col-md-12">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="password">Password</label>
                    <div className="col-md-12">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row button">
                    <div className="col-md-12 ">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        id="submit"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>
                <footer>
                  <a href="/signup" className="link-primary">
                    Creer account
                  </a>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
