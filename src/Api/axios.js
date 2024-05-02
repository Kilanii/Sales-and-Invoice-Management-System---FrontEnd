import axios from "axios";
import Cookie from "cookie-universal";
import { baseUrl } from "./Api";

const cookie = Cookie();
const token = cookie.get("usertoken");

export const Axios = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
});

