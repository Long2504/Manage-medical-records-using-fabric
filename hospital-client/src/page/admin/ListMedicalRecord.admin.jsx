import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMedicalRecord } from "../../redux/action/medicalRecord.action";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Typography } from "@mui/material";
import { Colors } from "../../constants/Colors";

function ListMedicalRecord() {
  const dispatch = useDispatch();
  const { listAllMedicalRecord } = useSelector(
    (state) => state.medicalRecordSlice
  );
  console.log(listAllMedicalRecord);
  //  const handleShow = (doctor) => {
  //    setDoctorCurrent(doctor);
  //    setShow(true);
  //  };
  useEffect(() => {
    dispatch(getAllMedicalRecord());
    console.log(listAllMedicalRecord);
  }, [dispatch]);

  return (
    <div>
      <Typography
        variant="h4"
        sx={{ color: Colors.DEFAULT_COLOR, marginBottom: "20px" }}>
        Tất cả hồ sơ
      </Typography>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên</th>
            <th>Bác sỹ</th>
            <th>Ngày</th>
            <th>Xem chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {listAllMedicalRecord.map((item) => {
            return (
              <tr key={item.key}>
                <td>{item.key}</td>
                <td>{item?.patient?.name}</td>
                <td>{item.medicalRecords.Record.doctor?.name}</td>
                <td>{item.medicalRecords.Record.date}</td>
                <td>
                  <Button
                    variant="primary"
                  // onClick={() => handleShow(item)}
                  >
                    Xem chi tiết
                  </Button>
                </td>
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
      </Table>
    </div>
  );
}
export default ListMedicalRecord;
