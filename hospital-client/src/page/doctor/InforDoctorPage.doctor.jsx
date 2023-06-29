import { Avatar, Box, Typography, Divider, TextField } from "@mui/material";
import Auth from "../../utils/helper/auth.helper";
import logo from "../../assests/image/Logo.png";
import { Colors } from "../../constants/Colors";
import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

function InforDoctor() {
  const inforDoctor = Auth.getInfo();
  const [isEdit, setIsEdit] = useState(false);
  const updateDoctor = () => { };
  return (
    <Box className="info-doctor-page">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          aligItenms: "flex-start",
          justifyContent: "center",
          marginRight: "30px",
        }}>
        <Box
          className="info-doctor-page__name"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.DEFAULT_LIGHT_COLOR,
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #f0f1f2",
            marginRight: "10px",
          }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "20px",
            }}>
            {!isEdit && (
              <Button onClick={() => setIsEdit(true)}>
                <CreateIcon color={Colors.DEFAULT_COLOR} />
              </Button>
            )}
            {isEdit && (
              <>
                <Button
                  onClick={() => {
                    updateDoctor();
                  }}>
                  <CheckIcon color={Colors.DEFAULT_COLOR} />
                </Button>
                <Button onClick={() => setIsEdit(false)}>
                  <ClearIcon color={Colors.RED} />
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ marginBottom: "50px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Avatar
                alt="user"
                src={logo}
                sx={{ width: 100, height: 100, verticalAlign: "center" }}
              />
            </Box>

            <Typography
              variant="h6"
              sx={{
                width: "100%",
                textAlign: "center",
                borderBottom: "1px",
                borderBottomColor: Colors.BLACK,
              }}></Typography>
          </Box>
          <Divider />

          <Box>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography
                sx={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
                Tên
              </Typography>
              <TextField
                id="name"
                variant="outlined"
                value={inforDoctor?.doctor?.name}
                disabled={!isEdit}
              />
            </Box>

            <Box sx={{ marginBottom: "10px" }}>
              <Typography
                sx={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
                Email
              </Typography>
              <TextField
                id="email"
                variant="outlined"
                value={inforDoctor?.email}
                disabled={!isEdit}
              />
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography
                sx={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
                Số điện thoại
              </Typography>
              <TextField
                id="phone"
                variant="outlined"
                value={inforDoctor?.doctor?.phone}
                disabled={!isEdit}
              />
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography
                sx={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
                Địa chỉ
              </Typography>
              <TextField
                id="address"
                variant="outlined"
                value={inforDoctor?.doctor?.address}
                disabled={!isEdit}
              />
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography
                sx={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
                Khoa
              </Typography>
              <TextField
                id="specialityID"
                variant="outlined"
                value={inforDoctor?.doctor?.specialityID?.name}
                disabled={!isEdit}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: Colors.DEFAULT_LIGHT_COLOR,
            padding: "30px",
            borderRadius: "10px",
            border: "1px solid #f0f1f2",
            marginRight: "10px",
          }}>
          <Typography
            sx={{
              color: Colors.BLACK,
              fontWeight: "700",
              marginBottom: "20px",
            }}>
            Thông tin chi tiết
          </Typography>
          <Typography sx={{ color: Colors.BLACK }}>
            {inforDoctor?.doctor?.description}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: Colors.DEFAULT_LIGHT_COLOR,
            padding: "30px",
            borderRadius: "10px",
            border: "1px solid #f0f1f2",
            marginRight: "10px",
          }}>
          <Typography
            sx={{
              color: Colors.BLACK,
              fontWeight: "700",
              marginBottom: "20px",
            }}>
            Kinh nghiệm
          </Typography>
          {inforDoctor?.doctor?.experiences.map((item, index) => {
            return (
              <div key={index}>
                <Typography sx={{ color: Colors.BLACK }}>{item}</Typography>
              </div>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
export default InforDoctor;
