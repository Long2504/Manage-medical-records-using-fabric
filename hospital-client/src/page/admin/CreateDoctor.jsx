import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Box, Typography, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Colors } from "../../constants/Colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDoctor,
  getAllSpeciality,
} from "../../redux/action/doctor.action";
import { useNavigate } from "react-router-dom";
export default function CreateDoctor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { loading } = state.doctorSlice;
  const [doctor, setDoctor] = useState({
    name: "",
    phone: "",
    specialityID: "",
    description: "",
    experiences: "",
  });

  const [error, setError] = useState(null);
  const [speciality, setSpeciality] = useState({});

  const handleSpecialityChange = (event) => {
    setDoctor({ ...doctor, specialityID: event.target.value });
    setSpeciality(event.target.value);
  };
  console.log("speciality", speciality);
  console.log("ID", doctor.specialityID);
  const handleConfirm = () => {
    dispatch(createDoctor(doctor));
    navigate("/list-doctor");
  };

  const onChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setDoctor({ ...doctor, [name]: value });
    if (
      doctor.name === "" ||
      doctor.phone === "" ||
      doctor.specialityID === ""
    ) {
      setError("Vui lòng nhập đầy đủ thông tin bắt buộc");
    } else {
      setError("");
    }
    console.log(doctor);
  };
  useEffect(() => {
    dispatch(getAllSpeciality());
  }, [dispatch]);
  console.log(state.doctorSlice.listSpeciality);
  return (
    <div>
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
            id="name"
            label="Họ tên *"
            variant="outlined"
            name="name"
            onChange={(e) => onChange(e)}
          />
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <InputLabel id="demo-simple-select-label">Chuyên khoa *</InputLabel>
            <Select
              labelId="selecrt"
              id="select"
              name="specialityID"
              label="Age"
              value={speciality}
              onChange={(e) => handleSpecialityChange(e)}>
              {state.doctorSlice.listSpeciality.map((item) => {
                return (
                  <MenuItem key={item?._id} value={item?._id}>
                    {item?.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            sx={{ marginBottom: "20px" }}
            id="phone"
            label="Số điện thoại *"
            variant="outlined"
            name="phone"
            onChange={(e) => onChange(e)}
          />
          <TextField
            sx={{ marginBottom: "20px" }}
            id="description"
            label="Thông tin chi tiết"
            multiline
            rows={5}
            variant="outlined"
            name="description"
            onChange={(e) => onChange(e)}
          />
          <TextField
            sx={{ marginBottom: "20px" }}
            id="experiences"
            label="Kinh nghiệm"
            multiline
            rows={5}
            variant="outlined"
            name="experiences"
            onChange={(e) => onChange(e)}
          />
        </Box>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "30px",
        }}>
        <Button
          variant="success"
          type="submit"
          style={{ width: "150px" }}
          onClick={() => handleConfirm()}>
          {loading ? (
            <Spinner animation="border" variant="light" size="sm" />
          ) : (
            "Tạo tài khoản"
          )}
        </Button>
        {error && (
          <Typography sx={{ color: "red", marginLeft: "30px" }}>
            {error}
          </Typography>
        )}
      </Box>
    </div>
  );
}
