import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import doctorController from "../controllers/doctor.controller.js";
import authMiddlewares from "../middleware/auth.middlewares.js";

const router = Router();
// register account for admin
router.post(
    "/create-account-admin",
    adminController.createAdmin
);



// register account for doctor
router.post(
    "/doctor/create-account-doctor",
    adminController.createAccountDoctor
);
//get all doctor
router.get(
    "/doctor/get-all-doctor",
    authMiddlewares.verifyToken,
    authMiddlewares.verifyRole("admin"),
    doctorController.getAllDoctor
)

//get doctor not join channel
router.get(
    "/doctor/get-doctor-not-join-channel",
    // authMiddlewares.verifyToken,
    // authMiddlewares.verifyRole("admin"),
    doctorController.getDoctorNotJoinChannel
)


export default router;
