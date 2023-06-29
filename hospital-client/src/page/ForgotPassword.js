import { TextField, Button, Box, InputAdornment } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPassword } from "../redux/action/auth.action";
import logo from "../assests/image/Logo.png";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.authSlice);
  const onChange = (e) => {
    setUsername(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ForgotPassword(username)).then(() => {
      navigate("/verify-code", { state: { username: username } });
    });
  };
  return (
    <form className="login-page" type="submit" onSubmit={handleSubmit}>
      <div className="login-page__center">
        <img src={logo} alt="logo" loading="lazy" />
        <h7 className="login-page__center__subtitle">
          Nhập tên đăng nhập đã được cung cấp và chúng tôi sẽ gửi cho bạn mã qua
          email của bạn để đặt lại mật khẩu.
        </h7>
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
                  <MailOutlineIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            name="username"
            id="outlined-basic"
            label="Tên đăng nhập"
            variant="outlined"
            onChange={(e) => onChange(e)}
          />
        </Box>

        {state.loading ? (
          <Spinner animation="border" variant="success" size="sm" />
        ) : (
          <Button
            className="login-page__center__btn-confirm"
            variant="contained"
            type="submit">
            Nhận mã
          </Button>
        )}
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

export default ForgotPasswordPage;
