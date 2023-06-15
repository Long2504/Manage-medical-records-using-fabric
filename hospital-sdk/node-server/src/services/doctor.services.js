import Doctor from "../models/doctor.js";

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
    const doctor = await Doctor.find({ specialityID: specialityId });
    return doctor;
};

const getDoctorById = async (doctorId) => {
    const doctor = await Doctor.findOne({ doctorID: doctorId });
    return doctor;
};
export default {
    create,
    getDoctorByIdSpeciality,
    checkDoctorExist,
    getDoctorById,
};
