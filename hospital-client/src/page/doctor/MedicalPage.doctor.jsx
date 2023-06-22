import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { getMedicalRecordByIdDoctor } from "../../redux/action/medicalRecord.action";
import Auth from "../../utils/helper/auth.helper";
import { Colors } from "../../constants/Colors";

function MedicalRecordPage() {
  const dispatch = useDispatch();
  const idDoctor = Auth.getIdDoctor();
  const { listMedicalRecord } = useSelector(
    (state) => state.medicalRecordSlice
  );

  useEffect(() => {
    dispatch(
      getMedicalRecordByIdDoctor({
        doctorID: idDoctor,
      })
    );
  }, [dispatch]);
  const [show, setShow] = useState(false);
  const [medicalRecordCurrent, setMedicalRecordCurrent] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (medicalRecord) => {
    setMedicalRecordCurrent(medicalRecord);
    setShow(true);
  };
  console.log(listMedicalRecord);
  return (
    <div>
      <Typography
        variant="h4"
        sx={{ color: Colors.DEFAULT_COLOR, marginBottom: "20px" }}>
        Đơn thuốc
      </Typography>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Thời gian khám</th>
            <th>Xem chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {listMedicalRecord.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.patient.name}</td>
                <td>{item.patient.phone}</td>
                <td>{item.medicalRecords.date}</td>
                <td>
                  <Button variant="success" onClick={() => handleShow(item)}>
                    Xem
                  </Button>
                </td>
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose} className="pt-5">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin hồ sơ bệnh án</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Thông tin bệnh nhân</p>
            <div style={{ display: "flex" }}>
              <div>
                <p
                  style={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    marginRight: "10px",
                  }}>
                  Họ tên
                </p>
                <p
                  style={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    marginRight: "10px",
                  }}>
                  Ngày sinh
                </p>
                <p
                  style={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    marginRight: "10px",
                  }}>
                  Địa chỉ
                </p>
                <p
                  style={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    marginRight: "10px",
                  }}>
                  Số điện thoại
                </p>
                <p
                  style={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    marginRight: "10px",
                  }}>
                  Mô tả của bệnh nhân
                </p>
                <p
                  style={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    marginRight: "10px",
                  }}>
                  Người khám
                </p>
              </div>
              <div>
                <p>{medicalRecordCurrent.patient?.name}</p>
                <p>{medicalRecordCurrent.patient?.dateOfBirth}</p>
                <p>{medicalRecordCurrent.patient?.address}</p>
                <p>{medicalRecordCurrent.patient?.phone}</p>
                <p>Đau bụng</p>
                <p>{medicalRecordCurrent.medicalRecord?.doctor.name}</p>
              </div>
            </div>
          </div>

          <div>
            <p
              style={{
                color: Colors.DEFAULT_COLOR,
                fontWeight: "700",
                marginRight: "10px",
              }}>
              Thông tin bệnh án
            </p>
            <div style={{ display: "flex" }}>
              <div>
                <p
                  style={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    marginRight: "10px",
                  }}>
                  Triệu chứng
                </p>
                <p
                  style={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    marginRight: "10px",
                  }}>
                  Chẩn đoán
                </p>
                <p
                  style={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    marginRight: "10px",
                  }}>
                  Quá trình điều trị
                </p>
                <p
                  style={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    marginRight: "10px",
                  }}>
                  Tiến trình bệnh
                </p>
                <p
                  style={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    marginRight: "10px",
                  }}>
                  Đơn thuốc
                </p>
                <p
                  style={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    marginRight: "10px",
                  }}>
                  Ghi chú
                </p>
              </div>
              <div>
                <p>{medicalRecordCurrent.medicalRecord?.symptonOfDisease}</p>
                <p>{medicalRecordCurrent.medicalRecord?.diagosisOfDoctor}</p>
                <p>{medicalRecordCurrent.medicalRecord?.treatmentProcess}</p>
                <p>{medicalRecordCurrent.medicalRecord?.diseaseProgression}</p>
                <p>{medicalRecordCurrent.medicalRecord?.prescription}</p>
                <p>{medicalRecordCurrent.medicalRecord?.note}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MedicalRecordPage;
