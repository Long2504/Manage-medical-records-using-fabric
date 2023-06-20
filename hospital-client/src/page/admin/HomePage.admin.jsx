import { Routes, Route, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import { useDispatch } from "react-redux";
import Auth from "../../utils/helper/auth.helper";
import { logout } from "../../redux/slice/auth.slice";
import CreateAccountDoctor from "./CreateAccountDoctor.admin";
import ListDoctorPage from "./ListDoctorPage.admin";
import ListMedicalRecord from "./ListMedicalRecord.admin";
function HomePageAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }
  return (
    <div className="home-page-admin">
      <div className="home-page-admin__nav">
        <Tabs
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
          orientation="vertical"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
        </Tabs>
        {/* <p>Quản lý</p>
        <div onClick={() => navigate("/create-doctor")}>Tạo tài khoản bác sĩ</div>
        <div onClick={() => navigate("/list-doctor")}>Danh sách bác sĩ</div>
        <div onClick={() => navigate("/list-medical-record")}>Danh sách hồ sơ bệnh án</div>
        <p>Cài đặt</p>
        <div onClick={() => handleLogout()}>Logout</div> */}
      </div>
      <div className="home-page-doctor__content">
        <Routes>
          <Route path="create-doctor" element={<CreateAccountDoctor />} />
          <Route path="list-doctor" element={<ListDoctorPage />} />
          <Route path="list-medical-record" element={<ListMedicalRecord />} />
        </Routes>
      </div>

    </div>
  );
}
export default HomePageAdmin;