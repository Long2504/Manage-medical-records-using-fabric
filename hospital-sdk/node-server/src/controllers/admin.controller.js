import User from "../models/user.js";
import bcrypt from "bcryptjs";
import handleError from "../middleware/error.middewares.js";
import doctorServices from "../services/doctor.services.js";
// register a new user
const createAccountDoctor = async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync("1", 8),
            status: "Active",
            roles: "doctor",
        });
        await user.save();
        return res.status(200).send("User was registered successfully!");
    } catch (error) {
        handleError(500, error, res);
    }
};

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
