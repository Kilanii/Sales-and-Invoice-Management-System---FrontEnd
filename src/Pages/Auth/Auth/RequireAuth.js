import { Navigate, Outlet } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER, baseUrl } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";

function RequireAuth() {
  const [user, setUser] = useState("");
  const cookie = Cookie();
  const token = cookie.get("usertoken");

  useEffect(() => {
    Axios.get(`/${USER}`,
  ).then((data) => setUser(data.data))
  .catch(() => Navigate("/signin", { replace: true}))
  }, []);

  return;
}
export default RequireAuth;
