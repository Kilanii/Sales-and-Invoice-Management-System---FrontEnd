import axios from "axios";
import Cookie from "cookie-universal";
import { baseUrl } from "./Api";

const cookie = Cookie();
const token = cookie.get("usertoken");

export const Axios = axios.create({
  baseUrl: baseUrl ,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
