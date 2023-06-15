import specialityController from "../controllers/speciality.controller.js";
import { Router } from "express";
import authMiddlewares from "../middleware/auth.middlewares.js";
const router = Router();

export default router;

router.post("/create", specialityController.createSpeciality);

router.get(
    "/get-all",
    authMiddlewares.verifyToken,
    specialityController.getAllSpeciality
);
