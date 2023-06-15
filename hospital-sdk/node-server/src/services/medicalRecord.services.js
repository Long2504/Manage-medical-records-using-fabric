import doctorServices from "./doctor.services.js";
const checkNullOfFieldsMedicalRecord = (data) => {
    if (!data.medicalRecordID) {
        return {
            error: "medicalRecordID is required",
            status: 400,
        };
    }
    if (!data.patientID) {
        return {
            error: "patientID is required",
            status: 400,
        };
    }
    if (!data.doctor.doctorID) {
        return {
            error: "doctorID is required",
            status: 400,
        };
    }
    if (doctorServices.checkDoctorExist(data.doctorID) === false) {
        return {
            error: "doctorID is not exist",
            status: 404,
        };
    }
    if (!data.date) {
        return {
            error: "date is required",
            status: 400,
        };
    }
    return false;
};

export default { checkNullOfFieldsMedicalRecord };
