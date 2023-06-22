import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/auth.slice";
import CreateAccountDoctor from "./CreateAccountDoctor.admin";
import ListDoctorPage from "./ListDoctorPage.admin";
import ListMedicalRecord from "./ListMedicalRecord.admin";
import Sidebar from "../../components/Sidebar";
import { FaBoxes, FaHospitalUser, FaUserPlus } from "react-icons/fa";

const menuItem = [
  {
    path: "/create-doctor",
    name: "Tạo tài khoản bác sĩ",
    icon: <FaUserPlus />,
  },
  {
    path: "/list-doctor",
    name: "Bác sĩ",
    icon: <FaHospitalUser />,
  },
  {
    path: "/list-medical-record",
    name: "Hồ sơ bệnh án",
    icon: <FaBoxes />,
  },
];
function HomePageAdmin() {
  return (
    <div className="home-page-admin">
      <div className="home-page-admin__content">
        <Sidebar menuItem={menuItem}>
          <Routes>
            <Route path="/" element={<CreateAccountDoctor />} />
            <Route path="create-doctor" element={<CreateAccountDoctor />} />
            <Route path="list-doctor" element={<ListDoctorPage />} />
            <Route path="list-medical-record" element={<ListMedicalRecord />} />
          </Routes>
        </Sidebar>
      </div>
    </div>
  );
}
export default HomePageAdmin;
