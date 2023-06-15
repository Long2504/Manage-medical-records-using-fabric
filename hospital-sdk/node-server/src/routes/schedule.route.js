import { Router } from "express";
import scheduleController from "../controllers/schedule.controller.js";
import { checkExistById } from "../middleware/checkExist.middlewares.js";
import Speciality from "../models/speciality.js";
const router = Router();

export default router;

// router.post("/update", scheduleController.update);

// get schedule by speciality
router.post(
    "/get-schedule-speciality",
    checkExistById(Speciality, "specialityID"),
    scheduleController.getScheduleBySpeciality
);

// get schedule by doctor
router.post(
    "/get-schedule-doctor",
    // checkExistById(Doctor, "doctorID"),
    scheduleController.getScheduleByDoctor
);

//create appointment schedule by speciality
router.post(
    "/create-appointment-schedule-by-speciality",
    // checkExistById(Speciality, "specialityID"),
    scheduleController.createAppointmentScheduleBySpeciality
);

//create appointment schedule by doctor
router.post(
    "/create-schedule-doctor",
    scheduleController.createAppointmentScheduleByDoctor
);

router.post("/check-update", scheduleController.checkUpdate);
