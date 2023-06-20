import React from "react";
import { Tab, Tabs, Box } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import InforDoctor from "./InforDoctorPage.doctor";
import SchedulePage from "./SchedulePage.doctor";
import MedicalRecordPage from "./MedicalPage.doctor";
import InforPatient from "./InforPatient.doctor";
import CreateMedical from "./CreateMedical.doctor";
import Auth from "../../utils/helper/auth.helper";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/auth.slice";
import logo from "../../assests/image/Logo.png";

function HomePageDoctor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className="home-page-doctor">
      <div className="home-page-doctor__nav">
        <img src={logo} style={{ height: '100px', width: '100px' }} />
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "100%", marginTop: "20px" }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            aria-label="scrollable prevent tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
            value={value}
            onChange={handleChange}
          >
            <Tab label="Thông tin cá nhân" onClick={() => navigate("/infor")} />
            <Tab label="Lịch khám" onClick={() => navigate("/schedule")} />
            <Tab label="Danh sách hồ sơ bệnh án" onClick={() => navigate("/medical-record")} />
          </Tabs>
          {/* <p>Quản lý</p>
          <div onClick={() => navigate("/infor")}>INFOR</div>
          <div onClick={() => navigate("/schedule")}>Schedule</div>
          <div onClick={() => navigate("/medical-record")}>Medical Record</div>
          <p>Cài đặt</p>
          <div onClick={() => handleLogout()}>Logout</div> */}
        </Box>
      </div>
      <div className="home-page-doctor__content">
        <Routes>
          <Route path="/infor" element={<InforDoctor />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/medical-record" element={<MedicalRecordPage />} />
          <Route path="/info-patient" element={<InforPatient />} />
          <Route path="/create-medical-record" element={<CreateMedical />} />
        </Routes>
      </div>
    </div>
  )
}

export default HomePageDoctor

