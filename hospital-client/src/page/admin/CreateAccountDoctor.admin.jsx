import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { Box, Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAccountDoctor,
  getAllDoctorNotJoinChannel,
} from "../../redux/action/doctor.action";
import { Colors } from "../../constants/Colors";

function CreateAccountDoctor() {
  const state = useSelector((state) => state);
  const { listDoctorNotJoinChannel } = state.doctorSlice;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDoctorNotJoinChannel());
  }, [dispatch]);
  const [doctorCurrent, setDoctorCurrent] = useState({
    name: "",
    phone: "",
    specialityID: {
      name: "",
    },
    description: "",
    experiences: [],
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [doctorCreated, setDoctorCreated] = useState({
    username: "",
    email: "",
    doctorId: "",
  });
  const [error, setError] = useState(null);
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  //handle
  const handleChoiceDoctor = (doctor) => {
    console.log("doctor", doctor);
    setDoctorCurrent(doctor);
    setDoctorCreated({ ...doctorCreated, doctorId: doctor._id });
    setShow(false);
  };
  const onChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    if (!isValidEmail(e.target.value)) {
      setError("Email không hợp lệ");
    } else {
      setError(null);
    }
    setDoctorCreated({ ...doctorCreated, [name]: value });
  };
  const handleConfirm = () => {
    if (doctorCreated.name === "" || doctorCreated.email === "") {
      setError("Vui lòng nhập đầy đủ thông tin");
    } else {
      dispatch(createAccountDoctor(doctorCreated)).then((res) => {
        if (res.error.message) {
          setError("Tên đăng nhập đã tồn tại");
        } else {
          navigate("/");
        }
      });
    }
  };

  return (
    <div style={{ marginTop: "60px" }}>
      <Typography
        variant="h4"
        sx={{
          color: Colors.DEFAULT_COLOR,
          marginBottom: "20px",
          textAlign: "center",
        }}>
        Tạo tài khoản bác sĩ
      </Typography>
      <div>
        <Typography
          sx={{
            color: Colors.DEFAULT_COLOR,
            marginTop: "30px",
            marginBottom: "10px",
            fontSize: "20px",
          }}>
          Thông tin tài khoản của bác sĩ
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "30px",
          }}>
          <TextField
            id="username"
            label="Tên đăng nhập"
            name="username"
            variant="outlined"
            onChange={(e) => onChange(e)}
            sx={{ marginRight: "50px" }}
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            sx={{ marginRight: "20px" }}
            onChange={(e) => onChange(e)}
          />
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
      </div>
      <div>
        <Typography
          sx={{
            color: Colors.DEFAULT_COLOR,
            fontSize: "20px",
            marginBottom: "10px",
          }}>
          Thông tin bác sĩ
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button
            className="mb-3"
            variant="success"
            onClick={() => handleShow()}>
            Chọn thông tin bác sĩ
          </Button>
          <TextField
            sx={{ marginBottom: "20px" }}
            id="doctorname"
            label="Họ tên"
            variant="outlined"
            value={doctorCurrent.name}
          />
          <TextField
            sx={{ marginBottom: "20px" }}
            id="speciality"
            label="Chuyên khoa"
            variant="outlined"
            value={doctorCurrent.specialityID.name}
          />
          <TextField
            sx={{ marginBottom: "20px" }}
            id="phone"
            label="Số điện thoại"
            variant="outlined"
            value={doctorCurrent.phone}
          />
          <TextField
            sx={{ marginBottom: "20px" }}
            id="description"
            label="Thông tin chi tiết"
            multiline
            rows={5}
            variant="outlined"
            value={doctorCurrent.description}
          />
          <TextField
            sx={{ marginBottom: "20px" }}
            id="experiences"
            label="Kinh nghiệm"
            multiline
            rows={5}
            variant="outlined"
            value={doctorCurrent.experiences}
          />
        </Box>
      </div>
      <div>
        {state.doctorSlice.loading ? (
          <Spinner animation="border" variant="light" size="sm" />
        ) : (
          <Button
            variant="success"
            type="submit"
            onClick={() => handleConfirm()}
            style={{ width: "150px" }}>
            Tạo tài khoản
          </Button>
        )}
      </div>
      <Modal show={show} onHide={handleClose} className="pt-5">
        <Modal.Header closeButton>
          <Modal.Title>Danh sách các bác sĩ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Thông tin bác sĩ</p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên</th>
                  <th>Số điện thoại</th>
                  <th>Chuyên khoa</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listDoctorNotJoinChannel.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.specialityID.name}</td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => handleChoiceDoctor(item)}>
                          Chọn
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                <tr></tr>
              </tbody>
            </Table>
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

export default CreateAccountDoctor;
