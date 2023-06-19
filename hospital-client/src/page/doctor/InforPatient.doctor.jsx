import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
function InforPatient() {
  const navigate = useNavigate();
  const handleCreateMedicalRecord = () => {
    navigate("/create-medical-record")
  }
  return (
    <div>
      <h1>Thông tin bệnh nhân</h1>
      <Button variant="primary" onClick={() => handleCreateMedicalRecord()}>Primary</Button>
    </div>
  )
}
export default InforPatient;