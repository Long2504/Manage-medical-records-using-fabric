import { Routes, Route, useNavigate } from "react-router-dom";
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
        <p>Quản lý</p>
        <div onClick={() => navigate("/create-doctor")}>Tạo tài khoản bác sĩ</div>
        <div onClick={() => navigate("/list-doctor")}>Danh sách bác sĩ</div>
        <div onClick={() => navigate("/list-medical-record")}>Danh sách hồ sơ bệnh án</div>

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