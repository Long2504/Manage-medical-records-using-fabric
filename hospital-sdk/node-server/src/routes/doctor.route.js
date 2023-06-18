import { Router } from "express";
import doctorController from "../controllers/doctor.controller.js";
import authMiddlewares from "../middleware/auth.middlewares.js";
const router = Router();

// router.post("/create",  doctorController.createDoctor);
// router.post("/init-doctor", doctorController.initDoctor);
//done
router.post("/create-medical-record", doctorController.createMedicalRecord);
//create test medical record
router.post("/create-test-medical-record", doctorController.createMedicalRecordWithTest);
//done
router.post("/update-medical-record", doctorController.updateMedicalRecord);
//done
router.post(
    "/get-doctors-by-speciality",
    authMiddlewares.verifyToken,
    doctorController.getDoctorsBySpeciality
);

export default router;
