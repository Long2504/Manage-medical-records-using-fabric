import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/email.js";
import mailContent from "../utils/mailContent.js";
import { randomBytes } from "crypto";
import handleError from "../middleware/error.middewares.js";
import doctorServices from "../services/doctor.services.js";
import patientServices from "../services/patient.services.js";

// register a new user
const signup = async (req, res) => {
    try {
        const token = jwt.sign(
            { email: req.body.email },
            process.env.JWT_SECRET + req.body.email
        );
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            confirmationCode: token,
        });
        await user.save();
        sendEmail(
            user.email,
            "Please confirm your account",
            mailContent.mailResgist(user.username, user.confirmationCode)
        );
        res.status(200).send("User was registered successfully!");
    } catch (error) {
        handleError(500, error, res);
    }
};

// sign in
const signin = async (req, res) => {
    try {
        const user = req.user;
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400, // 24 hours
        });
        if (user.roles.includes("doctor")) {
            const doctor = await doctorServices.getDoctorByIdUser(user._id);
            return res.status(200).send({
                id: user._id,
                email: user.email,
                roles: user.roles,
                accessToken: token,
                doctor: doctor
            });
        }
        if (user.roles.includes("user")) {
            const patient = await patientServices.getPatientByUserId(user._id);
            return res.status(200).send({
                id: user._id,
                email: user.email,
                roles: user.roles,
                accessToken: token,
                patient: patient
            });
        }

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
        });
    } catch (error) {
        handleError(500, error, res);
    }
};

// confirm email address
const verifyUser = async (req, res) => {
    try {
        const user = await User.findOne({
            confirmationCode: req.params.confirmationCode,
        });
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        user.status = "Active";
        await user.save();
        return res
            .status(200)
            .send("The account has been verified. Please log in.");
    } catch (error) {
        handleError(500, error, res);
    }
};

// forgot password
const forgotPassword = async (req, res) => {
    try {
        const token = randomBytes(20).toString("hex");
        const user = req.user;
        user.confirmationCode = token;
        user.resetTokenExpiry = Date.now() + 3600000; // Token is valid for 1 hour
        await user.save();
        sendEmail(
            user.email,
            "Please reset your password",
            mailContent.mailForgot(user.name, token)
        );
    } catch (error) {
        handleError(500, error, res);
    }
};
// reset password
const resetPassword = async (req, res) => {
    try {
        const user = req.user;
        user.password = bcrypt.hashSync(req.body.newPassword, 8);
        user.confirmationCode = null;
        user.resetTokenExpiry = null;
        await user.save();
        return res
            .status(200)
            .send("The password has been reset. Please log in.");
    } catch (error) {
        handleError(500, error, res);
    }
};

export default {
    signup,
    signin,
    verifyUser,
    forgotPassword,
    resetPassword,
};
