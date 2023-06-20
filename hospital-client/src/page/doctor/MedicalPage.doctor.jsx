import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getMedicalRecordByIdDoctor } from '../../redux/action/medicalRecord.action';
import Auth from '../../utils/helper/auth.helper';

function MedicalRecordPage() {
  const dispatch = useDispatch();
  const idDoctor = Auth.getIdDoctor();
  const { listMedicalRecord } = useSelector(state => state.medicalRecordSlice);

  useEffect(() => {
    dispatch(getMedicalRecordByIdDoctor({
      doctorID: idDoctor,
    }));
  }, [dispatch]);
  const [show, setShow] = useState(false);
  const [medicalRecordCurrent, setMedicalRecordCurrent] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (medicalRecord) => {
    setMedicalRecordCurrent(medicalRecord);
    setShow(true);
  }
  console.log(listMedicalRecord);
  return (
    <div>
      <h1>Medical Record Page</h1>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
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
          {
            listMedicalRecord.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.patient.name}</td>
                  <td>{item.patient.phone}</td>
                  <td>{item.medicalRecords.date}</td>
                  <td><Button variant="primary" onClick={() => handleShow(item)}>Xem</Button></td>
                </tr>
              )
            }
            )
          }
          <tr>
          </tr>
        </tbody>

      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin hồ sơ bệnh án</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Thông tin bệnh nhân</p>
            <div style={{ display: 'flex' }}>
              <div>
                <p>Họ tên</p>
                <p>Ngày sinh</p>
                <p>Địa chỉ</p>
                <p>Số điện thoại</p>
                <p>Mô tả của bệnh nhân</p>
                <p>Người khám</p>
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
            <p>Thông tin bệnh án</p>
            <div style={{ display: 'flex' }}>
              <div>
                <p>Triệu chứng</p>
                <p>Chẩn đoán</p>
                <p>Quá trình điều trị</p>
                <p>Tiến trình bệnh</p>
                <p>Đơn thuốc</p>
                <p>Ghi chú</p>
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
  )
};

export default MedicalRecordPage;