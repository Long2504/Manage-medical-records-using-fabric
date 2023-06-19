import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getScheduleOfDoctorByDate } from '../../redux/action/schedule.action';

function SchedulePage() {
  const { listScheduleByDate } = useSelector(state => state.scheduleSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getScheduleOfDoctorByDate({
      doctorID: "64532f139ec3cad23c35c889",
      date: "2021-05-01"
    }));
  }, [dispatch]);
  console.log(listScheduleByDate);


  const navigate = useNavigate();
  const handleSelect = (data) => {
    navigate("/info-patient", { state: { patient: data.patient } })
  };
  return (
    <div>
      <h1>SchedulePage</h1>
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Họ Tên</th>
            <th>Ngày đặt lịch</th>
            <th>Giờ đặt lịch</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            listScheduleByDate.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.patient.name}</td>
                  <td>{item.scheduleDoctor.appointmentDate}</td>
                  <td>{item.scheduleDoctor.appointmentTime}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleSelect(item)}>Xem chi tiết</Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
};
export default SchedulePage;