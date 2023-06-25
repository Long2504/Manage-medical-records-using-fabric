
import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";
import Speciality from "../models/speciality.js";
import { checkFormatDate, checkFormatId } from "../utils/common.js";
const checkModelExits = async (model, field, value) => {
	const data = await model.findOne({ [field]: value });
	if (!data) {
		return {
			status: 404,
			message: `The ${field} is not found`,
		};
	}
	return false;
};

const checkExistOfCreateSchedule = async (specialityId, patientID) => {
	try {
		const speciality = await checkModelExits(Speciality, "_id", specialityId);
		if (speciality) return speciality;
		const patient = await checkModelExits(Patient, "_id", patientID);
		if (patient) return patient;
	} catch (error) {
		return {
			status: 500,
			error: error
		};
	}
};

const isDoctorOfCreateSchedule = async (doctorID) => {
	try {
		if (checkFormatId(doctorID)) {
			return await checkModelExits(Doctor, "_id", doctorID);
		}
		return {
			status: 400,
			message: "DoctorID is not valid",
		};
	} catch (error) {
		return {
			status: 500,
			message: error,
		}
	}
};


export default {
	checkModelExits,
	checkExistOfCreateSchedule,
	isDoctorOfCreateSchedule
};
