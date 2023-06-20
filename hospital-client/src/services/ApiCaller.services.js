import axios from "axios";
import { LOCAL } from "../utils/constants";
import Auth from "../utils/helper/auth.helper";

export const ApiCaller = (method, body, endpoint) => {
  return axios({
    method: method,
    url: `http://45.32.28.204:8081/api/${endpoint}`,
    headers: getHeader(),
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
