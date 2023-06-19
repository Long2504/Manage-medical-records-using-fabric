import { LOCAL } from "../constants";
const Auth = {};
Auth.setInfo = (data) => {
  localStorage.setItem(LOCAL.INFO, JSON.stringify({ doctor: data.doctor, email: data.email }));
  localStorage.setItem(LOCAL.TOKEN, JSON.stringify(data.accessToken));
  localStorage.setItem(LOCAL.ROLE, JSON.stringify(data.roles));
}

Auth.removeInfo = () => {
  localStorage.removeItem(LOCAL.INFO);
  localStorage.removeItem(LOCAL.TOKEN);
}

Auth.getRole = () => {
  const role = localStorage.getItem(LOCAL.ROLE);
  return role ? JSON.parse(role) : null;
}

Auth.getInfo = () => {
  const info = localStorage.getItem(LOCAL.INFO);
  return info ? JSON.parse(info) : null;
}

Auth.getIdDoctor = () => {
  const info = localStorage.getItem(LOCAL.INFO);
  return info ? JSON.parse(info).doctor._id : null;
}

Auth.getToken = () => {
  const token = localStorage.getItem(LOCAL.TOKEN);
  return token ? JSON.parse(token) : null;
}

Auth.checkLogin = () => {
  return Auth.getToken() ? true : false;
}

export default Auth;