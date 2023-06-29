import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { getMedicalRecordByIdDoctor } from "../../redux/action/medicalRecord.action";
import Auth from "../../utils/helper/auth.helper";
import { Colors } from "../../constants/Colors";
import { searchRecordByDoctor } from "../../redux/slice/medicalRecord.slice";

function MedicalRecordPage() {
  const dispatch = useDispatch();
  const idDoctor = Auth.getIdDoctor();
  const { listMedicalRecord, filterMedicalRecord } = useSelector(
    (state) => state.medicalRecordSlice
  );


  const [search, setSearch] = useState("");
  const changeSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const getRecordByDoctor = async () => {
      await dispatch(
        getMedicalRecordByIdDoctor({
          doctorID: idDoctor,
        })
      );
      dispatch(searchRecordByDoctor(search));
    };
    getRecordByDoctor();
  }, [search, dispatch]);

  const [show, setShow] = useState(false);
  const [medicalRecordCurrent, setMedicalRecordCurrent] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (medicalRecord) => {
    setMedicalRecordCurrent(medicalRecord);
    setShow(true);
  };
  return (
    <div>
      <Typography
        variant="h4"
        sx={{ color: Colors.DEFAULT_COLOR, marginBottom: "20px" }}>
        Hồ sơ bệnh án
      </Typography>
      <input
        placeholder="Tìm kiếm"
        onChange={changeSearch}
        type="text"
        value={search}
        style={{
          marginBottom: "10px",
          padding: "5px",
          width: "100%",
          height: "40px",
          border: "1px solid",
          borderColor: Colors.GRAY,
          borderRadius: "5px",
          ":focus": {
            borderColor: Colors.DEFAULT_COLOR,
          },
        }}
      />
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
          {filterMedicalRecord.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.patient?.name}</td>
                <td>{item?.patient?.phone}</td>
                <td>{item?.medicalRecords?.date}</td>
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
                  Người khám
                </p>
              </div>
              <div>
                <p style={{ height: "24px" }}>
                  {medicalRecordCurrent.patient?.name}
                </p>
                <p style={{ height: "24px" }}>
                  {medicalRecordCurrent.patient?.dateOfBirth}
                </p>
                <p style={{ height: "24px" }}>
                  {medicalRecordCurrent.patient?.address}
                </p>
                <p style={{ height: "24px" }}>
                  {medicalRecordCurrent.patient?.phone}
                </p>
                <p style={{ height: "24px" }}>
                  {medicalRecordCurrent.medicalRecords?.doctor?.name}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p>Thông tin bệnh án</p>
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
                <p style={{ height: "24px" }}>
                  {medicalRecordCurrent.medicalRecords?.symptonOfDisease}
                </p>
                <p style={{ height: "24px" }}>
                  {medicalRecordCurrent.medicalRecords?.diagosisOfDoctor}
                </p>
                <p style={{ height: "24px" }}>
                  {medicalRecordCurrent.medicalRecords?.treatmentProcess}
                </p>
                <p style={{ height: "24px" }}>
                  {medicalRecordCurrent.medicalRecords?.diseaseProgression}
                </p>
                <p style={{ height: "24px" }}>
                  {medicalRecordCurrent.medicalRecords?.prescription}
                </p>
                <p style={{ height: "24px" }}>
                  {medicalRecordCurrent.medicalRecords?.note}
                </p>
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
