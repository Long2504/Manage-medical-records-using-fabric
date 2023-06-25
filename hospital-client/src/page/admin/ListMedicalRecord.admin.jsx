import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMedicalRecord } from "../../redux/action/medicalRecord.action";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Typography } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import { Colors } from "../../constants/Colors";
import { searchRecord } from "../../redux/slice/medicalRecord.slice";

function ListMedicalRecord() {
  const dispatch = useDispatch();
  const { listAllMedicalRecord, filterMedicalRecord } = useSelector(
    (state) => state.medicalRecordSlice
  );
  const [search, setSearch] = useState("");
  const changeSearch = (e) => {
    setSearch(e.target.value);
  };
  console.log(listAllMedicalRecord);
  const [show, setShow] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({
    name: "",
    phone: "",
    specialityID: {
      name: "",
    },
    description: "",
    experiences: [],
  });
  const handleClose = () => setShow(false);
  const handleShow = (record) => {
    setCurrentRecord(record);
    setShow(true);
  };
  useEffect(() => {
    const getList = async () => {
      await dispatch(getAllMedicalRecord());
      dispatch(searchRecord(search));
    };
    getList();
  }, [search, dispatch]);

  return (
    <div>
      <Typography
        variant="h4"
        sx={{ color: Colors.DEFAULT_COLOR, marginBottom: "20px" }}>
        Tất cả hồ sơ
      </Typography>
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
            <th>Tên bệnh nhân</th>
            <th>Số điện thoại</th>
            <th>Bác sỹ</th>
            <th>Ngày</th>
            <th>Xem chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {filterMedicalRecord.map((item, index) => {
            return (
              <tr key={item.medicalRecords?.Key}>
                <td>{item.medicalRecords?.Key}</td>
                <td>{item?.patient?.name}</td>
                <td>{item?.patient?.phone}</td>
                <td>{item.medicalRecords?.Record?.doctor?.name}</td>
                <td>{item.medicalRecords?.Record?.date}</td>
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
          <Modal.Title color={Colors.BLACK}>Thông tin chi tiết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Typography
              sx={{
                color: Colors.BLACK,
                fontWeight: "700",
                padding: "10px",
                height: "44px",
              }}>
              Thông tin bệnh nhân
            </Typography>
            <div style={{ display: "flex" }}>
              <div>
                <Typography
                  sx={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                    height: "44px",
                  }}>
                  Họ tên
                </Typography>
                <Typography
                  sx={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                    height: "44px",
                  }}>
                  Ngày sinh
                </Typography>
                <Typography
                  sx={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                    height: "44px",
                  }}>
                  Địa chỉ
                </Typography>
                <Typography
                  sx={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                    height: "44px",
                  }}>
                  Số điện thoại
                </Typography>
                <Typography
                  sx={{
                    color: Colors.BLACK,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                    height: "44px",
                  }}>
                  Thông tin chi tiết
                </Typography>
                <Typography
                  sx={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                    height: "44px",
                  }}>
                  Mã hồ sơ
                </Typography>
                <Typography
                  sx={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                    height: "44px",
                  }}>
                  Ngày
                </Typography>
                <Typography
                  sx={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                    height: "44px",
                  }}>
                  Chuẩn đoán của bác sĩ
                </Typography>
                <Typography
                  sx={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                    height: "44px",
                  }}>
                  Quá trình điều trị
                </Typography>
                <Typography
                  sx={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                    height: "44px",
                  }}>
                  Đơn thuốc
                </Typography>
                <Typography
                  sx={{
                    color: Colors.DEFAULT_COLOR,
                    fontWeight: "700",
                    width: "150px",
                    padding: "10px",
                    height: "44px",
                  }}>
                  Ghi chú
                </Typography>
              </div>
              <div>
                <Typography
                  sx={{
                    padding: "10px",
                    height: "44px",
                  }}>
                  {currentRecord?.patient?.name}
                </Typography>
                <Typography
                  sx={{
                    padding: "10px",
                    height: "44px",
                  }}>
                  {currentRecord?.patient?.dateOfBirth}
                </Typography>
                <Typography
                  sx={{
                    padding: "10px",
                    height: "44px",
                  }}>
                  {currentRecord?.patient?.address}
                </Typography>
                <Typography
                  sx={{
                    padding: "10px",
                    height: "44px",
                  }}>
                  {currentRecord?.patient?.phone}
                </Typography>
                <Typography
                  sx={{
                    padding: "10px",
                    height: "44px",
                  }}></Typography>

                <Typography
                  sx={{
                    padding: "10px",
                    height: "44px",
                  }}>
                  {currentRecord?.medicalRecords?.Key}
                </Typography>
                <Typography
                  sx={{
                    padding: "10px",
                    height: "44px",
                  }}>
                  {currentRecord?.medicalRecords?.Record?.date}
                </Typography>
                <Typography
                  sx={{
                    padding: "10px",
                    height: "44px",
                  }}>
                  {currentRecord?.medicalRecords?.Record?.diagosisOfDoctor}
                </Typography>
                <Typography
                  sx={{
                    padding: "10px",
                    height: "44px",
                  }}>
                  {currentRecord?.medicalRecords?.Record?.treatmentProcess}
                </Typography>
                <Typography
                  sx={{
                    padding: "10px",
                    height: "44px",
                  }}>
                  {currentRecord?.medicalRecords?.Record?.prescription}
                </Typography>
                <Typography
                  sx={{
                    padding: "10px",
                    height: "44px",
                  }}>
                  {currentRecord?.medicalRecords?.Record?.note}
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
export default ListMedicalRecord;
