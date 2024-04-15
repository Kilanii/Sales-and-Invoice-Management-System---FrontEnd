import React from "react";
import { LOGOUT, baseUrl } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import axios from "axios";
function Logout() {
  async function handleLogout() {
    try {
      const res = await axios.get(`${baseUrl}${LOGOUT}`);
      console.log(res);
      window.location.pathname = "/signin";      
    } catch (err) {
      console.log(err);
    }

  }

  return <button className="" onClick={handleLogout}>Logout</button>;
}

export default Logout;
