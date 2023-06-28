import { TextField, Button, Box, InputAdornment } from "@mui/material";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import { Colors } from "../../constants/Colors";
import logo from "../../assests/image/Logo.png";
import { ChangePassword } from "../../redux/action/auth.action";

function ChangePasswordPage() {
  const [data, setData] = useState({
    password: "",
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
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.newPassword === "" ||
      data.password === "" ||
      data.rePassword === ""
    ) {
      setAlertShow(true);
      setError("Vui lòng điền đẩy đủ thông tin");
    } else {
      if (data.rePassword !== data.newPassword) {
        setAlertShow(true);
        setError("Mật khẩu không khớp");
      } else {
        dispatch(
          ChangePassword({
            password: data.password,
            newPassword: data.newPassword,
          })
        ).then(() => {
          setAlertShow(true);
          setError("Đổi mật khẩu thành công");
        });
      }
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <form type="submit" onSubmit={handleSubmit}>
        <Box className="login-page__center">
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
              name="password"
              id="outlined-basic"
              label="Mật khẩu hiện tại"
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
        </Box>
      </form>
    </Box>
  );
}

export default ChangePasswordPage;
