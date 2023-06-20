import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMedicalRecord } from "../../redux/action/medicalRecord.action";
function ListMedicalRecord() {
  const dispatch = useDispatch();
  const { listAllMedicalRecord } = useSelector(state => state.medicalRecordSlice);
  console.log(listAllMedicalRecord);
  useEffect(() => {
    dispatch(getAllMedicalRecord());
  }, [dispatch]);

  return (
    <div>
      <h1>List Medical Record</h1>
    </div>
  )
}
export default ListMedicalRecord;