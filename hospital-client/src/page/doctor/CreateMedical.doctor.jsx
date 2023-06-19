import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { createMedicalRecord } from '../../redux/action/medicalRecord.action';
import Auth from '../../utils/helper/auth.helper';
function CreateMedical() {
  const location = useLocation();
  const doctorId = Auth.getIdDoctor();
  const dispatch = useDispatch();
  const [medicalRecord, setMedicalRecord] = useState({
    patientID: location.state.patient._id,
    doctorID: doctorId,
    symptonOfDisease: "",
    diagosisOfDoctor: "",
    treatmentProcess: "",
    diseaseProgression: "",
    prescription: "",
    note: ""
  });

  const onChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setMedicalRecord({ ...medicalRecord, [name]: value });
  };

  const handleCreateMedicalRecord = () => {
    dispatch(createMedicalRecord(medicalRecord));
  }

  return (
    <div>
      <h1>Create Medical</h1>
      <Button variant="success" onClick={() => handleCreateMedicalRecord()}>Xác nhận</Button>
      <Button variant="danger">Hủy bỏ</Button>
      <div>
        <p>Thông tin bệnh nhân</p>
        <div style={{ display: 'flex' }}>
          <div>
            <p>Họ tên</p>
            <p>Ngày sinh</p>
            <p>Giới tính</p>
            <p>Địa chỉ</p>
            <p>Số điện thoại</p>
            <p>Mô tả của bệnh nhân</p>
            <p>Người khám</p>
          </div>
          <div>
            <p>Nguyễn Văn A</p>
            <p>01/01/1999</p>
            <p>Nam</p>
            <p>Địa chỉ</p>
            <p>0123456789</p>
            <p>ấdfasd</p>
            <p>Doctor 1</p>
          </div>
        </div>
        <div>
          <FloatingLabel controlId="floatingTextarea2" label="Triệu chứng">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
              className="mb-3"
              name='symptonOfDisease'
              onChange={(e) => onChange(e)}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea2" label="Chuẩn đoán của bác sĩ">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
              className="mb-3"
              name='diagosisOfDoctor'
              onChange={(e) => onChange(e)}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea2" label="Quá trình điều trị">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
              className="mb-3"
              name='treatmentProcess'
              onChange={(e) => onChange(e)}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea2" label="Tiến trình bệnh">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
              className="mb-3"
              name='diseaseProgression'
              onChange={(e) => onChange(e)}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea2" label="Đơn thuốc">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
              className="mb-3"
              name='prescription'
              onChange={(e) => onChange(e)}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea2" label="Ghi chú">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
              className="mb-3"
              name='note'
              onChange={(e) => onChange(e)}
            />
          </FloatingLabel>

        </div>
      </div>
    </div>
  );
}

export default CreateMedical;