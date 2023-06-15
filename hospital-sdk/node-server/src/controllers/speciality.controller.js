import { readFileSync } from "fs";
import Speciality from "../models/speciality.js";
import handleError from "../middleware/error.middewares.js";
import { specialities } from "../../data/specialities.js";

const createSpeciality = async (req, res) => {
    try {
        for (let i = 0; i < specialities.length; i++) {
            const speciality = new Speciality({
                name: specialities[i].name,
                description: specialities[i].description,
            });
            await speciality.save();
        }
        return res.status(200).send("ok");
    } catch (error) {
        handleError(500, error, res);
    }
};

const getAllSpeciality = async (req, res) => {
    try {
        const specialities = await Speciality.find();
        return res.status(200).send(specialities);
    } catch (error) {
        handleError(500, error, res);
    }
};
export default {
    createSpeciality,
    getAllSpeciality,
};
