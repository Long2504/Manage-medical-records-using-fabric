import { Router } from "express";
import doctorController from "../controllers/doctor.controller.js";
import authMiddlewares from "../middleware/auth.middlewares.js";
import authController from "../controllers/auth.controller.js";
import specialityController from "../controllers/speciality.controller.js";

const router = Router();

// router.post("/create",  doctorController.createDoctor);
// router.post("/init-doctor", doctorController.initDoctor);
//done
router.post("/create-medical-record", authMiddlewares.verifyToken, doctorController.createMedicalRecord);
//create test medical record
router.post("/create-test-medical-record", doctorController.createMedicalRecordWithTest);
//done
router.post("/update-medical-record", doctorController.updateMedicalRecord);


router.post(
    "/get-schedule-doctor",
    doctorController.getScheduleOfDoctorByDate,
);

// update profile doctor
router.post(
    "/update-doctor",
    doctorController.updateDoctor,
);
// get profile doctor by id
router.post(
    "/get-doctor-by-id",
    authController.updateAccountDoctor,
);

//----------------------------------------------------------------------//
// new all api 

//get all speciality
router.get(
    "/get-all-speciality",
    authMiddlewares.verifyToken,
    specialityController.getAllSpeciality
);

// get all doctor
router.get(
    "/get-all-doctor",
    authMiddlewares.verifyToken,
    doctorController.getAllDoctor
);

//get doctors by speciality
router.post(
    "/get-doctors-by-speciality",
    authMiddlewares.verifyToken,
    doctorController.getDoctorsBySpeciality
);


export default router;
