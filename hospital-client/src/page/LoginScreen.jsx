
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Login } from '../redux/action/auth.action';
import { useNavigate } from "react-router-dom";
function LoginScreen() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(Login(user)).then(() => navigate("/"));

  }
  return (
    <div>
      <br />
      <input name="username" type="text" placeholder="username" onChange={(e) => onChange(e)} />
      <br />
      <input name="password" type="password" placeholder="password" onChange={(e) => onChange(e)} />
      <br />
      <button onClick={(e) => handleLogin(e)}>Login</button>
    </div>
  )
}

export default LoginScreen