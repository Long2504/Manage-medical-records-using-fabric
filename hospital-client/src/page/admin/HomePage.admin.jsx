import { Routes, Route } from "react-router-dom";
import CreateAccountDoctor from "./CreateAccountDoctor.admin";
import ListDoctorPage from "./ListDoctorPage.admin";
import ListMedicalRecord from "./ListMedicalRecord.admin";
import Sidebar from "../../components/Sidebar";
import { FaBoxes, FaHospitalUser, FaUserPlus } from "react-icons/fa";
import { AccountDoctor } from "./AccountDoctor";
import CreateDoctor from "./CreateDoctor";
import UpdateDoctor from "./UpdateDoctor";

const menuItem = [
  {
    path: "/list-doctor",
    name: "Bác sĩ",
    icon: <FaHospitalUser />,
  },
  {
    path: "/account-doctor",
    name: "Tài khoản bác sĩ",
    icon: <FaUserPlus />,
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
            <Route path="/" element={<ListDoctorPage />} />
            <Route path="create-account" element={<CreateAccountDoctor />} />
            <Route path="create-doctor" element={<CreateDoctor />} />
            <Route path="update-doctor" element={<UpdateDoctor />} />
            <Route path="account-doctor" element={<AccountDoctor />} />
            <Route path="list-doctor" element={<ListDoctorPage />} />
            <Route path="list-medical-record" element={<ListMedicalRecord />} />
          </Routes>
        </Sidebar>
      </div>
    </div>
  );
}
export default HomePageAdmin;
