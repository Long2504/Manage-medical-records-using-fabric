import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { createMedicalRecord } from "../../redux/action/medicalRecord.action";
import Auth from "../../utils/helper/auth.helper";
import { Typography } from "@mui/material";
import { Colors } from "../../constants/Colors";
import "./doctor.scss";
function CreateMedical() {
  const location = useLocation();
  const patient = location.state.patient;
  console.log(patient);
  const doctorId = Auth.getIdDoctor();
  const doctorName = Auth.getNameDoctor();
  const dispatch = useDispatch();
  const [medicalRecord, setMedicalRecord] = useState({
    patientID: location.state.patient._id,
    doctorID: doctorId,
    symptonOfDisease: "",
    diagosisOfDoctor: "",
    treatmentProcess: "",
    diseaseProgression: "",
    prescription: "",
    note: "",
  });

  const onChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setMedicalRecord({ ...medicalRecord, [name]: value });
    console.log("medicalRecord", medicalRecord);
  };

  const handleCreateMedicalRecord = () => {
    dispatch(createMedicalRecord(medicalRecord));
  };

  return (
    <div>
      <Typography
        variant="h4"
        sx={{ color: Colors.DEFAULT_COLOR, marginBottom: "20px" }}>
        Tình trạng bệnh nhân
      </Typography>
      <div>
        <p>Thông tin bệnh nhân</p>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "30px" }}>
            <p style={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
              Họ tên
            </p>
            <p style={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
              Ngày sinh
            </p>
            <p style={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
              Giới tính
            </p>
            <p style={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
              Địa chỉ
            </p>
            <p style={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
              Số điện thoại
            </p>
            <p style={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
              Mô tả của bệnh nhân
            </p>
            <p style={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
              Người khám
            </p>
          </div>
          <div>
            <p style={{ color: Colors.BLACK }}>{patient.name}</p>
            <p style={{ color: Colors.BLACK }}>{patient.dateOfBirth}</p>
            <p style={{ color: Colors.BLACK }}>Nam</p>
            <p style={{ color: Colors.BLACK }}>{patient.address}</p>
            <p style={{ color: Colors.BLACK }}>{patient.phone}</p>
            <p style={{ color: Colors.BLACK }}>ấdfasd</p>
            <p style={{ color: Colors.BLACK }}>{doctorName}</p>
          </div>
        </div>
        <div>
          <FloatingLabel controlId="floatingTextarea2" label="Triệu chứng">
            <Form.Control
              className="mb-3 border border-success"
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              name="symptonOfDisease"
              onChange={(e) => onChange(e)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea2"
            label="Chuẩn đoán của bác sĩ">
            <Form.Control
              className="mb-3 border border-success"
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              name="diagosisOfDoctor"
              onChange={(e) => onChange(e)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea2"
            label="Quá trình điều trị">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              className="mb-3 border border-success"
              name="treatmentProcess"
              onChange={(e) => onChange(e)}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea2" label="Tiến trình bệnh">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              className="mb-3 border border-success"
              name="diseaseProgression"
              onChange={(e) => onChange(e)}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea2" label="Đơn thuốc">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              className="mb-3 border border-success"
              name="prescription"
              onChange={(e) => onChange(e)}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingTextarea2" label="Ghi chú">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              className="mb-3 border border-success"
              name="note"
              onChange={(e) => onChange(e)}
            />
          </FloatingLabel>
        </div>
        <Button
          variant="success"
          onClick={() => handleCreateMedicalRecord()}
          style={{ marginRight: "30px" }}>
          Xác nhận
        </Button>
        <Button variant="danger">Hủy bỏ</Button>
      </div>
    </div>
  );
}

export default CreateMedical;
