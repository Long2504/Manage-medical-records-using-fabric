import axios from "axios";
import { LOCAL } from "../utils/constants";

export const ApiCaller = (method, body, endpoint) => {
  return axios({
    method: method,
    url: `https://localhost:8081/api/${endpoint}`,
    headers: getHeader(),
    data: body,
    withCredentials: true,
  });
};
const getHeader = () => {
  if (localStorage.getItem(LOCAL.TOKEN) !== null) {
    const token = localStorage.getItem(LOCAL.TOKEN);
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  return { "Content-Type": "application/json" };
};
