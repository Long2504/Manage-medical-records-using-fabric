import { Router } from "express";
import medicalRecordController from "../controllers/medicalRecord.controller.js";
import authMiddlewares from "../middleware/auth.middlewares.js";
import scheduleController from "../controllers/schedule.controller.js";


const router = Router();

export default router;
//get medical record by id patient
// not yet fix bug
router.post("/get-medical-record",authMiddlewares.verifyToken, medicalRecordController.getMedicalRecordByIdPatient);

// get schedule by speciality
//not yet fix bug
router.post("/get-schedule-speciality",authMiddlewares.verifyToken,scheduleController.getScheduleBySpeciality);

// get schedule by doctor
// not yet fix bug
router.post("/get-schedule-doctor",authMiddlewares.verifyToken,scheduleController.getScheduleByDoctor);

// //create appointment schedule by speciality
// // not yet fix bug
// router.post("/create-appointment-schedule-speciality",scheduleController.createAppointmentScheduleBySpeciality);

// //create appointment schedule by doctor
// // not yet fix bug
// router.post("/create-schedule-doctor",scheduleController.createAppointmentScheduleByDoctor);

//create schedule
router.post("/create-schedule",scheduleController.createAppointmentSchedule);  
