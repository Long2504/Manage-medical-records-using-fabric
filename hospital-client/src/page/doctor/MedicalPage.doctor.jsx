import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
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
    </div>
  )
};

export default MedicalRecordPage;