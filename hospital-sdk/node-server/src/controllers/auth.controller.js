import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/email.js";
import mailContent from "../utils/mailContent.js";
import { randomBytes } from "crypto";
import handleError from "../middleware/error.middewares.js";
import doctorServices from "../services/doctor.services.js";
import patientServices from "../services/patient.services.js";
import authServices from "../services/auth.services.js";
import { randomConfirmCode } from "../utils/common.js";
import { Console, log } from "console";

// register a new user
const signup = async (req, res) => {
    try {
        const code = randomConfirmCode();
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            confirmationCode: code,
        });
        await user.save();
        sendEmail(
            user.email,
            "Please confirm your account",
            mailContent.mailResgist(user.username, user.confirmationCode)
        );
        return res.status(200).send("User was registered successfully!");
    } catch (error) {
        handleError(500, error, res);
    }
};

// sign in
const signin = async (req, res) => {
    try {
        const user = req.user;
        const token = jwt.sign({ id: user }, process.env.JWT_SECRET, {
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

        return res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
            roles: user.roles,
        });
    } catch (error) {
        handleError(500, error, res);
    }
};

// confirm email address
const verifyUser = async (req, res) => {
    try {
        const username = req.body.username;
        const user = await User.findOne({
            username: username,
        });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        if (user.confirmationCode !== req.body.confirmationCode) {
            return res.status(400).send({ message: "Invalid confirmation code." });
        }
        user.status = "Active";
        user.confirmationCode = null;
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
        const code = randomConfirmCode();
        const user = req.user;
        console.log(user, "user");
        user.confirmationCode = code;
        user.resetTokenExpiry = Date.now() + 3600000; // Token is valid for 1 hour
        await user.save();
        sendEmail(
            user.email,
            "Please reset your password",
            mailContent.mailForgot(user.username, code)
        );
        return res.status(200).send({ email: user.email, username: user.username });
    } catch (error) {
        handleError(500, error, res);
    }
};

// verify reset password
const verifyResetPassword = async (req, res) => {
    try {
        const username = req.body.username;
        const user = await User.findOne({
            username: username,
        });
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        console.log(user, "user");
        console.log(req.body.confirmationCode, "req.body.confirmationCode");
        console.log(user.confirmationCode, "user.confirmationCode");
        if (user.confirmationCode !== req.body.confirmationCode) {
            return res.status(400).send({ message: "Invalid confirmation code." });
        }
        user.confirmationCode = null;
        await user.save();
        return res.status(200).send({ id: user._id });
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

//update gmail for account doctor
const updateAccountDoctor = async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        console.log(username, email);
        if (!username || !email) {
            return res.status(400).send({ message: "Username or email is empty" });
        }
        const userUpdate = authServices.updateAccountDoctor({ username: username, email: email });
        if (userUpdate.error) {
            return res.status(userUpdate.status).send({ message: userUpdate.error });
        }
        return res.status(200).send({ message: "Update account success" });

    }
    catch (error) {
        handleError(500, error, res);
    }
};

export default {
    signup,
    signin,
    verifyUser,
    forgotPassword,
    resetPassword,
    updateAccountDoctor,
    verifyResetPassword
};
