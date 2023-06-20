import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createAccountDoctor, getAllDoctorNotJoinChannel } from '../../redux/action/doctor.action';
function CreateAccountDoctor() {
  const { listDoctorNotJoinChannel } = useSelector(state => state.doctorSlice);

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
  //handle 
  const handleChoiceDoctor = (doctor) => {
    setDoctorCurrent(doctor);
    setDoctorCreated({ ...doctorCreated, doctorId: doctor._id });
    setShow(false);
  }
  const onChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setDoctorCreated({ ...doctorCreated, [name]: value });
  };
  const handleConfirm = () => {
    dispatch(createAccountDoctor(doctorCreated));
  }
  //-----------------------

  return (
    <div>
      <h1>Create Account Doctor</h1>
      <div>
        <p>Thông tin tài khoản của bác sĩ</p>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
          <Form.Control
            name="username"
            onChange={(e) => onChange(e)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
          <Form.Control
            name='email'
            onChange={(e) => onChange(e)}
          />
        </InputGroup>
      </div>
      <div>
        <p>Thông tin bác sĩ</p>
        <Button className="mb-3" variant="primary" onClick={() => handleShow()}>Chọn thông tin bác sĩ</Button>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Họ tên</InputGroup.Text>
          <Form.Control
            value={doctorCurrent.name}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Chuyên khoa</InputGroup.Text>
          <Form.Control
            value={doctorCurrent.specialityID.name}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Số điện thoại</InputGroup.Text>
          <Form.Control
            value={doctorCurrent.phone}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Thông tin chi tiết</InputGroup.Text>
          <Form.Control as="textarea" aria-label="With textarea"
            value={doctorCurrent.description}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Kinh nghiệm</InputGroup.Text>
          <Form.Control
            as="textarea" aria-label="With textarea" value={doctorCurrent.experiences} />
        </InputGroup>
      </div>
      <div>
        <Button variant="primary" type="submit" onClick={() => handleConfirm()}>
          Tạo tài khoản
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
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
                {
                  listDoctorNotJoinChannel.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.specialityID.name}</td>
                        <td>
                          <Button variant="primary" onClick={() => handleChoiceDoctor(item)}>
                            Chọn
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

export default CreateAccountDoctor