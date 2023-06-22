import { Avatar, Box, Typography, Divider } from "@mui/material";
import Auth from "../../utils/helper/auth.helper";
import logo from "../../assests/image/logo.png";
import { Colors } from "../../constants/Colors";

function InforDoctor() {
  const inforDoctor = Auth.getInfo();
  console.log(inforDoctor);
  return (
    <Box className="info-doctor-page">
      <div>
        <Box
          className="info-doctor-page__name"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div>
            <Avatar alt="user" src={logo} sx={{ width: 100, height: 100 }} />
          </div>
          <Typography variant="h6">{inforDoctor?.doctor.name}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "20px",
              marginTop: "20px",
            }}>
            <Box>
              <Typography
                sx={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
                Email
              </Typography>
              <Typography sx={{ color: Colors.GRAY }}>
                {inforDoctor.email}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
                Số điện thoại
              </Typography>
              <Typography sx={{ color: Colors.GRAY }}>
                {inforDoctor?.doctor.phone}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
                Địa chỉ
              </Typography>
              <Typography sx={{ color: Colors.GRAY }}>
                {inforDoctor?.doctor.address}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
            }}>
            <Typography sx={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
              Thông tin chi tiết
            </Typography>
            <Typography sx={{ color: Colors.GRAY }}>
              {inforDoctor?.doctor.description}
            </Typography>
          </Box>
          <Divider />

          <Box sx={{ marginTop: "20px" }}>
            <Typography sx={{ color: Colors.DEFAULT_COLOR, fontWeight: "700" }}>
              Kinh nghiệm
            </Typography>
            {inforDoctor?.doctor.experiences.map((item, index) => {
              return (
                <div key={index}>
                  <Typography sx={{ color: Colors.GRAY }}>{item}</Typography>
                </div>
              );
            })}
          </Box>
        </Box>
      </div>
    </Box>
  );
}
export default InforDoctor;
