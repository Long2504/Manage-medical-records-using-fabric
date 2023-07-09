import axios from "axios";
import { LOCAL } from "../utils/constants";
import Auth from "../utils/helper/auth.helper";

export const ApiCaller = (method, body, endpoint) => {
  const headers = getHeader();
  return axios({
    method: method,
    url: `https://d38d-42-1-94-27.ngrok-free.app/api/${endpoint}`,
    headers: headers,
    data: body,
    withCredentials: true,
  });
};
const getHeader = () => {
  if (localStorage.getItem(LOCAL.TOKEN) !== null) {
    const token = Auth.getToken();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  return { "Content-Type": "application/json" };
};
