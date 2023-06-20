import { Router } from "express";
import medicalRecordController from "../controllers/medicalRecord.controller.js";

const router = Router();

router.get("/get-all", medicalRecordController.getAllMedicalRecord);
router.post(
    "/get-by-id-doctor",
    medicalRecordController.getMedicalRecordByIdDoctor
);
router.post(
    "/get-by-id-patient",
    medicalRecordController.getMedicalRecordByIdPatient
);

export default router;
