import { Routes, Route, useNavigate } from "react-router-dom";
import InforDoctor from "./InforDoctorPage.doctor";
import SchedulePage from "./SchedulePage.doctor";
import MedicalRecordPage from "./MedicalPage.doctor";
import InforPatient from "./InforPatient.doctor";
import CreateMedical from "./CreateMedical.doctor";

function HomePageDoctor() {
  const navigate = useNavigate();
  return (
    <div className="home-page-doctor">
      <div className="home-page-doctor__nav">
        <p>Quản lý</p>
        <div onClick={() => navigate("/infor")}>INFOR</div>
        <div onClick={() => navigate("/schedule")}>Schedule</div>
        <div onClick={() => navigate("/medical-record")}>Medical Record</div>
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