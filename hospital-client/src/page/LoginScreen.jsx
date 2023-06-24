import { TextField, Button, Box, InputAdornment } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Login } from "../redux/action/auth.action";
import {  NavLink, useNavigate } from "react-router-dom";

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
  };
  return (
    <form className="login-page" type="submit" onSubmit={handleLogin}>
      <div className="login-page__center">
        <h1 className="login-page__center__title">Welcome</h1>
        <Box
          sx={{
            width: 400,
            maxWidth: "100%",
          }}
          className="login-page__center__input">
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            fullWidth
            name="username"
            id="outlined-basic"
            label="Tài khoản"
            variant="outlined"
            onChange={(e) => onChange(e)}
          />
        </Box>
        <Box
          sx={{
            withPassword: true,
            width: 400,
            maxWidth: "100%",
          }}
          className="login-page__center__input">
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockTwoToneIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            name="password"
            id="outlined-basic"
            label="Mật khẩu"
            variant="outlined"
            onChange={(e) => onChange(e)}
            type="password"
          />
        </Box>
        <div className="login-page__center__forgot">
          <NavLink to="/forgot-password">Quên mật khẩu?</NavLink>
        </div>
        <Button
          className="login-page__center__btn-confirm"
          variant="contained"
          type="submit">
          Đăng nhập
        </Button>
      </div>
      <div className="login-page__background">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1903 556">
          <path
            className="svg-banner-shape"
            d="M753.1,434.2c110.6,63.7,277.7,70.6,373.4,15.4L1905,0v555.9H0V0.2L753.1,434.2z"></path>
        </svg>
      </div>
    </form>
  );
}

export default LoginScreen;
