import bcrypt from "bcryptjs";
import handleError from "../middleware/error.middewares.js";
import doctorServices from "../services/doctor.services.js";
import authServices from "../services/auth.services.js";
import { registerUser } from "../../../fabric-network/app.js";
import User from "../models/user.js";
// register a new user
const createAccountDoctor = async (req, res) => {
    try {
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync("1", 8),
            status: "Active",
            roles: "doctor",
        }
        const errorCheckUser = await authServices.checkUser(newUser);
        if (errorCheckUser.error) {
            return res.status(errorCheckUser.status).send(errorCheckUser.error);
        }
        const errorDoctorId = await doctorServices.checkDoctorExist(req.body.doctorId);
        if (errorDoctorId.error) {
            return res.status(errorDoctorId.status).send(errorDoctorId.error);
        }
        await authServices.createUser(newUser);
        const user = await authServices.getUserByUserName(newUser.username);
        const doctor = await doctorServices.updateIdUserOfDoctor(req.body.doctorId, user._id);
        const data = {
            name: doctor.name,
            phone: doctor.phone,
            address: doctor.address,
            specialityID: doctor.specialityID,
            description: doctor.description,
            certifications: doctor.certifications,
            experiences: doctor.experiences,
            email: user.email,
        }
        const errorRegister = await registerUser(req.body.doctorId.toString());
        if (errorRegister.error) {
            return res.status(errorRegister.status).send(errorRegister.error);
        }
        await doctorServices.updateJoinedChannel(doctor._id, true);
        return res.status(200).send(data);
    } catch (error) {
        handleError(500, error, res);
    }
};
//register a new admin
const createAdmin = async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync("1", 8),
            status: "Active",
            roles: "admin",
        });
        await user.save();

        res.status(200).send("User was registered successfully!");
    } catch (error) {
        handleError(500, error, res);
    }
};

const getDoctorBySpecialty = async (req, res) => {
    try {
        const idSpeciality = req.body.specialtyId;
        if (!idSpeciality) {
            return res
                .status(400)
                .send({ message: "specialtyId is not require" });
        }
        const doctors = doctorServices.getDoctorByIdSpeciality(idSpeciality);
        res.status(200).send(doctors);
    } catch (error) {
        handleError(500, error, res);
    }
};
export default {
    createAccountDoctor,
    createAdmin,
    getDoctorBySpecialty,
};
