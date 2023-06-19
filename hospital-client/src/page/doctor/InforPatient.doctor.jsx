import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';
function InforPatient() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state.patient;
  console.log(patient);
  const handleCreateMedicalRecord = () => {
    navigate("/create-medical-record", { state: { patient: patient } })
  }
  return (
    <div>
      <h1>Thông tin bệnh nhân</h1>
      <Button variant="primary" onClick={() => handleCreateMedicalRecord()}>Khám bệnh</Button>
      <div>
        <p>
          <span>Họ tên: </span>
          <span>{patient.name}</span>
        </p>
        <p>
          <span>Ngày sinh: </span>
          <span>{patient.dateOfBirth}</span>
        </p>
        <p>
          <span>Giới tính: </span>
          <span>{patient.phone}</span>
        </p>
        <p>
          <span>Địa chỉ: </span>
          <span>{patient.address}</span>
        </p>
      </div>
    </div>
  )
}
export default InforPatient;