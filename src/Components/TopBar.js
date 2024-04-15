import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../context/MenuContext";
import { NavLink } from "react-router-dom";
import { LOGOUT, USER, baseUrl } from "../Api/Api";
import React from "react";
import { Axios } from "../Api/axios";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TopBar() {
  const navigate = useNavigate()
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const cookie = Cookie();
  const [name, setName] = useState("");
/*
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setName(data.data.name))
      .catch(() => navigate("/signin", { replace: true }));
  }, []);
*/
  async function handleLogout() {
    try {
      await axios.get(`${baseUrl}${LOGOUT}`);
      cookie.remove('usertoken')
      window.location.pathname = "/signin";
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="top-bar d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-5">
          <NavLink to="/dashboard" className="title">
            Kilanii
          </NavLink>
          <FontAwesomeIcon
            onClick={() => setIsOpen((prev) => !prev)}
            cursor={"pointer"}
            icon={faBars}
            className="icons"
          />
        </div>
        <button  onClick={handleLogout}>
          Logout
        </button>
    </div>
  );
}

export default TopBar;
