import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllDoctor } from "../../redux/action/doctor.action";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Typography } from "@mui/material";
import { Colors } from "../../constants/Colors";

function ListDoctorPage() {
  const dispatch = useDispatch();
  const { listDoctor } = useSelector((state) => state.doctorSlice);
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
  };
  console.log(listDoctor);
  return (
    <div>
      <Typography
        variant="h4"
        sx={{ color: Colors.DEFAULT_COLOR, marginBottom: "20px" }}>
        Tất cả bác sĩ
      </Typography>
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
          {listDoctor.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.specialityID.name}</td>
                <td>
                  <Button variant="success" onClick={() => handleShow(item)}>
                    Xem chi tiết
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
            <p>Thông tin bác sĩ</p>
            <div style={{ display: "flex" }}>
              <div>
                <Typography
                  sx={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                  }}>
                  Họ tên
                </Typography>
                <Typography
                  sx={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                  }}>
                  Địa chỉ
                </Typography>
                <Typography
                  sx={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                  }}>
                  Số điện thoại
                </Typography>
                <Typography
                  sx={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                  }}>
                  Chuyên khoa
                </Typography>
                <Typography
                  sx={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                  }}>
                  Thông tin chi tiết
                </Typography>
                <Typography
                  sx={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                  }}>
                  Kinh nghiệm
                </Typography>
              </div>
              <div>
                <Typography
                  sx={{
                    padding: "10px",
                  }}>
                  {doctorCurrent.name}
                </Typography>
                <Typography
                  sx={{
                    padding: "10px",
                  }}>
                  {doctorCurrent.address}
                </Typography>
                <Typography
                  sx={{
                    padding: "10px",
                  }}>
                  {doctorCurrent.phone}
                </Typography>
                <Typography
                  sx={{
                    padding: "10px",
                  }}>
                  {doctorCurrent.specialityID.name}
                </Typography>
                <Typography
                  sx={{
                    padding: "10px",
                  }}>
                  {doctorCurrent.desscription}
                </Typography>
                <Typography
                  sx={{
                    padding: "10px",
                  }}>
                  {doctorCurrent.experiences}
                </Typography>
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

export default ListDoctorPage;
