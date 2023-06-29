import Button from "react-bootstrap/Button";

import { Box, Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAllDoctorNotJoinChannel,
  updateDoctor,
} from "../../redux/action/doctor.action";
import { Colors } from "../../constants/Colors";

export default function UpdateDoctor() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname.split("/")[2]);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDoctorNotJoinChannel());
  }, [dispatch]);
  const [doctorCurrent, setDoctorCurrent] = useState(location.state.doctor);
  const [experience, setExperience] = useState("");
  console.log("doctor", doctorCurrent);
  console.log("experiences", doctorCurrent.experiences);
  const [isAdd, setIsAdd] = useState(false);

  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setDoctorCurrent({ ...doctorCurrent, [name]: value });
  };
  const handleConfirm = () => {
    dispatch(updateDoctor(doctorCurrent)).then(() => navigate("/list-doctor"));
    console.log(doctorCurrent);
  };

  return (
    <div style={{ marginTop: "60px" }}>
      <Typography
        variant="h4"
        sx={{
          color: Colors.DEFAULT_COLOR,
          marginBottom: "20px",
          textAlign: "center",
        }}>
        Sửa tài khoản bác sĩ
      </Typography>
      <div>
        <Typography
          sx={{
            color: Colors.DEFAULT_COLOR,
            fontSize: "20px",
            marginBottom: "10px",
          }}>
          Thông tin bác sĩ
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ marginBottom: "20px" }}
            id="doctorname"
            label="Họ tên"
            variant="outlined"
            value={doctorCurrent.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            sx={{ marginBottom: "20px" }}
            id="phone"
            label="Số điện thoại"
            variant="outlined"
            value={doctorCurrent.phone}
            name="phone"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            sx={{ marginBottom: "20px" }}
            id="description"
            label="Thông tin chi tiết"
            multiline
            rows={5}
            variant="outlined"
            value={doctorCurrent.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />

          <TextField
            sx={{ marginBottom: "20px" }}
            id="experiences"
            label="Kinh nghiệm"
            multiline
            rows={5}
            variant="outlined"
            value={doctorCurrent.experiences}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}>
            {isAdd && (
              <TextField
                sx={{ marginBottom: "20px", marginRight: "30px", width: "80%" }}
                id="doctorname"
                label="Thêm"
                variant="outlined"
                value={experience}
                name="experience"
                onChange={(e) => {
                  setExperience(e.target.value);
                  console.log(experience);
                }}
              />
            )}
            {isAdd ? (
              <Button
                variant="outline-success"
                onClick={() => {
                  console.log(experience);
                  setDoctorCurrent({
                    ...doctorCurrent,
                    experiences: [...doctorCurrent.experiences, experience],
                  });

                  setIsAdd(!isAdd);
                  setExperience("");
                }}
                style={{ width: "150px", marginBottom: "20px" }}>
                Thêm
              </Button>
            ) : (
              <Button
                variant="outline-success"
                onClick={() => setIsAdd(!isAdd)}
                style={{ width: "150px", marginBottom: "20px" }}>
                Thêm kinh nhiệm
              </Button>
            )}
          </Box>
        </Box>
      </div>
      <div>
        {state.doctorSlice.loading ? (
          <Spinner animation="border" variant="success" size="sm" />
        ) : (
          <Button
            variant="success"
            type="submit"
            onClick={() => handleConfirm()}>
            Cập nhật
          </Button>
        )}
      </div>
    </div>
  );
}
