import express from "express";
import authRoute from "./auth.route.js";
import scheduleRoute from "./schedule.route.js";
import doctorRoute from "./doctor.route.js";
import specialityRoute from "./speciality.route.js";
import adminRoute from "./admin.route.js";
import medicalRecordRoute from "./medicalRecord.route.js";
import patientRoute from "./patient.route.js";
const route = express.Router();

route.use("/auth", authRoute);
// route.use("/schedule", scheduleRoute);
route.use("/doctor", doctorRoute);
route.use("/speciality", specialityRoute);
route.use("/admin", adminRoute);
route.use("/medical-record", medicalRecordRoute);
route.use("/patient",patientRoute)

export default route;
