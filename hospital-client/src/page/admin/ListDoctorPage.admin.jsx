import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllDoctor } from "../../redux/action/doctor.action";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Typography, Box } from "@mui/material";
import { Colors } from "../../constants/Colors";
import { searchDoctor } from "../../redux/slice/doctor.slice";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function ListDoctorPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listDoctor, filterDoctors } = useSelector(
    (state) => state.doctorSlice
  );
  const [search, setSearch] = useState("");
  const changeSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const getListDoctor = async () => {
      await dispatch(getAllDoctor());
      dispatch(searchDoctor(search));
    };
    getListDoctor();
  }, [search, dispatch]);
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <Typography
          variant="h4"
          sx={{ color: Colors.DEFAULT_COLOR, marginBottom: "20px" }}>
          Tất cả bác sĩ
        </Typography>
        <Button
          style={{ margin: "10px" }}
          variant="outline-success"
          onClick={() => navigate("/create-doctor")}>
          Thêm bác sĩ
        </Button>
      </Box>

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
            <th>Khoa</th>
            <th>Xem chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {filterDoctors.map((item, index) => {
            return (
              <tr key={index} >
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.specialityID.name}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleShow(item)}
                    style={{ marginRight: "10px" }}>
                    Xem chi tiết
                  </Button>
                  <Button
                    variant="success"
                    onClick={() =>
                      navigate("/update-doctor", {
                        state: { doctor: item },
                      })
                    }>
                    Sửa
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
          <Modal.Title color={Colors.BLACK}>Thông tin bác sĩ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Typography
              sx={{
                color: Colors.BLACK,
                fontWeight: "700",
                width: "150px",
                padding: "10px",
              }}>
              Thông tin bác sĩ
            </Typography>
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
                    color: Colors.BLACK,
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
                  Chứng chỉ
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
                  }}></Typography>
                <Typography
                  sx={{
                    padding: "10px",
                  }}>
                  {doctorCurrent?.certifications}
                </Typography>
                <Typography
                  sx={{
                    padding: "10px",
                  }}>
                  {doctorCurrent?.desscription}
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
