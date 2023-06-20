import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { getAllDoctor } from '../../redux/action/doctor.action';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


function ListDoctorPage() {

  const dispatch = useDispatch();
  const { listDoctor } = useSelector(state => state.doctorSlice);
  console.log(listDoctor);
  useEffect(() => {
    dispatch(getAllDoctor());
  }, [dispatch]);
  const [show, setShow] = useState(false);
  const [doctorCurrent, setDoctorCurrent] = useState({
    name: "",
    phone: "",
    specialityID: {
      name: "",
    },
    description: "",
    experiences: [],
  });
  const handleClose = () => setShow(false);
  const handleShow = (doctor) => {
    setDoctorCurrent(doctor);
    setShow(true);
  }
  console.log(listDoctor);
  return (
    <div>
      <h1>ListDoctorPage</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Khoa</th>
            <th>Xem chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {
            listDoctor.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.specialityID.name}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleShow(item)}>
                      Xem chi tiết
                    </Button>
                  </td>
                </tr>
              )
            })
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
            <p>Thông tin bác sĩ</p>
            <div style={{ display: 'flex' }}>
              <div>
                <p>Họ tên</p>
                <p>Địa chỉ</p>
                <p>Số điện thoại</p>
                <p>Chuyên khoa</p>
                <p>Thông tin chi tiết</p>
                <p>Kinh nghiệm</p>
              </div>
              <div>
                <p>{doctorCurrent.name}</p>
                <p>{doctorCurrent.address}</p>
                <p>{doctorCurrent.phone}</p>
                <p>{doctorCurrent.specialityID.name}</p>
                <p>{doctorCurrent.desscription}</p>
                <p>{doctorCurrent.experiences}</p>
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
}

export default ListDoctorPage