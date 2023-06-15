import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import authMiddlewares from "../middleware/auth.middlewares.js";

const router = Router();

// register account for doctor
router.post(
    "doctor/create-account-doctor",
    authMiddlewares.verifyToken,
    authMiddlewares.verifyRole("admin"),
    adminController.createAccountDoctor
);

export default router;
