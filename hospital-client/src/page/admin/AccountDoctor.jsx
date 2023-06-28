import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllAccountDoctor } from "../../redux/action/doctor.action";
import { Colors } from "../../constants/Colors";
import { useNavigate } from "react-router-dom";
import { searchAccountDoctor } from "../../redux/slice/doctor.slice";

export function AccountDoctor() {
  const { listAccountDoctor, filterAccountDoctors } = useSelector(
    (state) => state.doctorSlice
  );
  console.log(listAccountDoctor);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const changeSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const getListAccountDoctor = async () => {
      await dispatch(getAllAccountDoctor());
      dispatch(searchAccountDoctor(search));
    };
    getListAccountDoctor();
  }, [search, dispatch]);

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
          Tất cả tài khoản
        </Typography>
        <Button
          style={{ margin: "10px" }}
          variant="outline-success"
          onClick={() => navigate("/create-account")}>
          Thêm tài khoản
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
            <th>Email</th>
            <th>Tên đăng nhập</th>
            <th>Họ Tên</th>
            <th>Điện Thoại</th>
            <th>Khoa</th>
          </tr>
        </thead>
        <tbody>
          {filterAccountDoctors.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.user?.email}</td>
                <td>{item?.user?.username}</td>
                <td>{item?.name}</td>
                <td>{item.phone}</td>
                <td>{item.specialityID.name}</td>
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
      </Table>
    </div>
  );
}
