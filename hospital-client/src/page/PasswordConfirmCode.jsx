import { TextField, Button, Box, InputAdornment } from "@mui/material";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../constants/Colors";
import logo from "../assests/image/Logo.png";
import { ApiCaller } from "../services/ApiCaller.services";

function PasswordConfirmCode() {
  const location = useLocation();
  const [data, setData] = useState({
    confirmationCode: "",
    username: location.state.username,
  });
  const [error, setError] = useState("");
  const state = useSelector((state) => state.authSlice);
  const onChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData({ ...data, [name]: value });
    console.log(data);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await ApiCaller("POST", data, "auth/verify-forget-password")
      .then((res) => {
        console.log("res", res, data);
        navigate("/password_reset", { state: { _id: res?.data?.id } });
      })
      .catch((error) => {
        setError("Mã xác nhận không chính xác");
      });
  };

  return (
    <form className="login-page" type="submit" onSubmit={handleSubmit}>
      <div className="login-page__center">
        <h2 style={{ color: Colors.DEFAULT_COLOR }}>Nhập mã xác nhận</h2>
        <img src={logo} alt="logo" loading="lazy" height={"90px"} />
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
            name="confirmationCode"
            id="outlined-basic"
            label="Mã xác nhận"
            variant="outlined"
            value={data.confirmationCode}
            onChange={(e) => onChange(e)}
            type="number"
          />
          <div style={{ color: Colors.RED }}>
            ***Lưu ý mã xác nhận gồm 6 chứ số
          </div>
          {state.error && <div style={{ color: Colors.RED }}>{error}</div>}
        </Box>
        <Button
          className="login-page__center__btn-confirm"
          variant="contained"
          type="submit">
          Xác nhận
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

export default PasswordConfirmCode;
