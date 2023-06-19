import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from "react-router-dom";
function SchedulePage() {
  const navigate = useNavigate();
  const handleSelect = () => {
    navigate("/info-patient")
  };
  return (
    <div>
      <h1>SchedulePage</h1>
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
      <div>
        <div onClick={() => handleSelect()}>08:00</div>
        <div>08:30</div>
        <div>09:00</div>
        <div>09:30</div>
        <div>10:00</div>
        <div>10:30</div>
        <div>11:00</div>
        <div>13:00</div>
        <div>13:30</div>
        <div>14:00</div>
        <div>14:30</div>
        <div>15:00</div>
        <div>15:30</div>
        <div>16:00</div>
      </div>
    </div>
  )
};
export default SchedulePage;