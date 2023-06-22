import React from "react";
import { FaCalendarAlt, FaUserAlt, FaBoxes } from "react-icons/fa";
import { Routes, Route } from "react-router-dom";
import InforDoctor from "./InforDoctorPage.doctor";
import SchedulePage from "./SchedulePage.doctor";
import MedicalRecordPage from "./MedicalPage.doctor";
import InforPatient from "./InforPatient.doctor";
import CreateMedical from "./CreateMedical.doctor";

import Sidebar from "../../components/Sidebar";

const menuItem = [
  {
    path: "/infor",
    name: "Thông tin cá nhân",
    icon: <FaUserAlt />,
  },
  {
    path: "/schedule",
    name: "Lịch khám",
    icon: <FaCalendarAlt />,
  },
  {
    path: "/medical-record",
    name: "Hồ sơ bệnh án",
    icon: <FaBoxes />,
  },
];
function HomePageDoctor() {
  return (
    <div className="home-page-doctor">
      <div className="home-page-doctor__content">
        <Sidebar menuItem={menuItem}>
          <Routes>
            <Route path="/" element={<InforDoctor />} />
            <Route path="/infor" element={<InforDoctor />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/medical-record" element={<MedicalRecordPage />} />
            <Route path="/info-patient" element={<InforPatient />} />
            <Route path="/create-medical-record" element={<CreateMedical />} />
          </Routes>
        </Sidebar>
      </div>
    </div>
  );
}

export default HomePageDoctor;
