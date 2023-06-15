import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import authMiddlewares from "../middleware/auth.middlewares.js";
import User from "../models/user.js";

const router = Router();

// register a new user
router.post(
    "/signup",
    authMiddlewares.checkDuplicateUsernameOrEmail(User, "email"),
    authMiddlewares.checkDuplicateUsernameOrEmail(User, "username"),
    authController.signup
);

// sign in
router.post(
    "/signin",
    authMiddlewares.checkUserExists("username"),
    authMiddlewares.checkPassword,
    authController.signin
);

// confirm email address
router.get("/confirm/:confirmationCode", authController.verifyUser);

// forgot password
router.post(
    "/forgotpassword",
    authMiddlewares.checkUserExists("email"),
    authController.forgotPassword
);

// reset password
router.post(
    "/password_reset",
    authMiddlewares.checkResetToken,
    authController.resetPassword
);

// change password
router.post(
    "/change_password",
    authMiddlewares.verifyToken,
    authMiddlewares.checkUserExists("id"),
    authMiddlewares.checkPassword,
    authController.resetPassword
);
export default router;
