import { Router } from "express";
import medicalRecordController from "../controllers/medicalRecord.controller.js";
import authMiddlewares from "../middleware/auth.middlewares.js";

const router = Router();


//-----------------------------------------------------------
// new api

//get all medical record
router.get("/get-all", medicalRecordController.getAllMedicalRecord);

//get medical record by doctor
router.post(
    "/get-by-id-doctor",
    medicalRecordController.getMedicalRecordByIdDoctor
);

//get medical record by id patient
router.post(
    "/get-by-id-patient",
    medicalRecordController.getMedicalRecordByIdPatient
);

//create medical record
router.post("/create-medical-record", authMiddlewares.verifyToken, medicalRecordController.createMedicalRecord);
export default router;
