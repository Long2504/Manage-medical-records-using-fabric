import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";
import { checkFormatId } from "../utils/common.js";

const create = async (newDoctor) => {
    const doctor = new Doctor(newDoctor);
    await doctor.save();
    return true;
};

const checkDoctorExist = async (doctorId) => {
    const doctor = await Doctor.findOne({ doctorID: doctorId });
    if (doctor) return { error: "doctorID is exist", status: 400 };
    return false;
};

const getDoctorByIdSpeciality = async (specialityId) => {
    const doctor = await Doctor.find({ specialityID: specialityId }).select("-_id -__v").populate({ path: "specialityID", select: "_id name" });
    return doctor;
};

const getDoctorById = async (doctorId) => {
    const doctor = await Doctor.findOne({ doctorID: doctorId }).select("-_id -__v").populate({ path: "specialityID", select: "_id name" });
    return doctor;
};

const getDoctorByIdUser = async (userId) => {
    const doctor = await Doctor.findOne({ user: userId }).select("-__v").populate({ path: "specialityID", select: "_id name" });
    return doctor;
};

const getAllDoctor = async () => {
    const doctor = await Doctor.find().select("-_id -__v").populate({ path: "specialityID", select: "_id name" });
    return doctor;
};

const getDoctorNotJoinChannel = async () => {
    const doctor = await Doctor.find({ joinedChannel: false }).select("-_id -__v").populate({ path: "specialityID", select: "_id name" });
    return doctor;
}

const updateIdUserOfDoctor = async (doctorId, idUser) => {
    const doctor = await Doctor.findOneAndUpdate({ _id: doctorId }, { user: idUser });
    return doctor;
};

const updateJoinedChannel = async (doctorId, joinedChannel) => {
    const doctor = await Doctor.findOneAndUpdate({ _id: doctorId }, { joinedChannel: joinedChannel });
    return doctor;
};

const checkFieldOfCreateMedicordRecord = async (doctorId, patientId) => {
    try {
        if (!doctorId || !patientId) return {
            status: 400,
            error: "doctorId or patientId is empty"
        };
        if (!checkFormatId(doctorId) || !checkFormatId(patientId)) return {
            status: 400,
            error: "doctorId or patientId is not valid"
        };
        const doctor = await Doctor.findOne({ _id: doctorId });
        if (!doctor) return {
            status: 404,
            error: "doctorId is not found"
        };
        const patient = await Patient.findOne({ _id: patientId });
        if (!patient) return {
            status: 404,
            error: "patientId is not found"
        };
        return doctor;
    } catch (error) {
        return {
            status: 500,
            error: error
        };
    }
};
export default {
    create,
    getDoctorByIdSpeciality,
    checkDoctorExist,
    getDoctorById,
    getDoctorByIdUser,
    getAllDoctor,
    getDoctorNotJoinChannel,
    updateIdUserOfDoctor,
    updateJoinedChannel,
    checkFieldOfCreateMedicordRecord
};
