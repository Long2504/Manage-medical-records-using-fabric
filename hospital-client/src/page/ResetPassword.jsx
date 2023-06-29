import { TextField, Button, Box, InputAdornment } from "@mui/material";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ResetPassword } from "../redux/action/auth.action";
import Alert from "@mui/material/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../constants/Colors";
import logo from "../assests/image/Logo.png";

function ResetPasswordPage() {
  const location = useLocation();
  const [data, setData] = useState({
    _id: location?.state?._id,
    newPassword: "",
    rePassword: "",
  });
  const [alertShow, setAlertShow] = useState(false);
  const [error, setError] = useState(null);
  const onChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData({ ...data, [name]: value });
    console.log(data);
  };
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.newPassword !== data.rePassword) {
      setAlertShow(true);
      setError("Mật khẩu không khớp");
    } else {
      if (data.newPassword === "" || data.rePassword === "") {
        setAlertShow(true);
        setError("Vui lòng điền đẩy đủ thông tin");
      } else {
        dispatch(
          ResetPassword({
            _id: data._id,
            newPassword: data.newPassword,
          })
        );
        navigate("/login");
        console.log("đổi mk ok");
      }
    }
  };
  return (
    <form className="login-page" type="submit" onSubmit={handleSubmit}>
      <div className="login-page__center">
        <h2 style={{ color: Colors.DEFAULT_COLOR }}>Đổi mật khẩu</h2>
        {alertShow && (
          <Alert severity="error" onClose={() => setAlertShow(false)}>
            {error}
          </Alert>
        )}
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
            name="newPassword"
            id="outlined-basic"
            label="Mật khẩu mới"
            variant="outlined"
            onChange={(e) => onChange(e)}
            type="password"
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
            name="rePassword"
            id="outlined-basic"
            label="Nhập lại mật khẩu"
            variant="outlined"
            onChange={(e) => onChange(e)}
            type="password"
          />
        </Box>

        <Button
          className="login-page__center__btn-confirm"
          variant="contained"
          type="submit">
          Đổi mật khẩu
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

export default ResetPasswordPage;
