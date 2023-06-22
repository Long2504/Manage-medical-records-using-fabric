import Button from "react-bootstrap/Button";
import { Typography, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Colors } from "../../constants/Colors";

function InforPatient() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state.patient;
  console.log(patient);
  const handleCreateMedicalRecord = () => {
    navigate("/create-medical-record", { state: { patient: patient } });
  };
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: Colors.DEFAULT_COLOR,
        borderRadius: "5px",
        padding: "20px",
        width: "80%",
      }}>
      <Typography
        variant="h4"
        sx={{ color: Colors.DEFAULT_COLOR, marginBottom: "20px" }}>
        Thông tin bệnh nhân
      </Typography>
      <Box sx={{ display: "flex", paddingTop: "20px" }}>
        <Typography
          sx={{
            color: Colors.DEFAULT_COLOR,
            fontWeight: "700",
            fontSize: "20px",
            marginRight: "30px",
            width: "100px",
          }}>
          Họ tên:
        </Typography>
        <Typography sx={{ color: Colors.GRAY, fontSize: "20px" }}>
          {patient.name}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", paddingTop: "20px" }}>
        <Typography
          sx={{
            color: Colors.DEFAULT_COLOR,
            fontWeight: "700",
            fontSize: "20px",
            marginRight: "30px",
            width: "100px",
          }}>
          Ngày sinh:
        </Typography>
        <Typography sx={{ color: Colors.GRAY, fontSize: "20px" }}>
          {patient.dateOfBirth}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", paddingTop: "20px" }}>
        <Typography
          sx={{
            color: Colors.DEFAULT_COLOR,
            fontWeight: "700",
            fontSize: "20px",
            marginRight: "30px",
            width: "100px",
          }}>
          Điện thoại:
        </Typography>
        <Typography sx={{ color: Colors.GRAY, fontSize: "20px" }}>
          {patient.phone}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", paddingTop: "20px" }}>
        <Typography
          sx={{
            color: Colors.DEFAULT_COLOR,
            fontWeight: "700",
            fontSize: "20px",
            marginRight: "30px",
            width: "100px",
          }}>
          Địa chỉ:
        </Typography>
        <Typography sx={{ color: Colors.GRAY, fontSize: "20px" }}>
          {patient.address}
        </Typography>
      </Box>

      <Box
        sx={{ marginTop: "30px", display: "flex", justifyContent: "flex-end" }}>
        <Button variant="success" onClick={() => handleCreateMedicalRecord()}>
          Khám bệnh
        </Button>
      </Box>
    </Box>
  );
}
export default InforPatient;
