import {
    getAllMedicalRecordsNetwork,
    checkUserExists,
    getMedicalRecordByIdPatientNetwork,
    getMedicalRecordByIdDoctorNetwork,
} from "../../../fabric-network/app.js";
import handleError from "../middleware/error.middewares.js";

const getAllMedicalRecord = async (req, res) => {
    try {
      
        const medicalRecords = await getAllMedicalRecordsNetwork(
            req.body.username
        );
        res.status(200).send(medicalRecords);
    } catch (error) {
        handleError(500, error, res);
    }
};

const getMedicalRecordByIdDoctor = async (req, res) => {
    try {
        const idDoctor = req.body.doctorID;
        if ((await checkUserExists(idDoctor)) === false) {
            return res.status(400).send({
                message: "Doctor does not exist",
            });
        }
        const medicalRecords = await getMedicalRecordByIdDoctorNetwork(
            idDoctor
        );
        res.status(200).send(medicalRecords);
    } catch (error) {
        handleError(500, error, res);
    }
};

const getMedicalRecordByIdPatient = async (req, res) => {
    try {
        const idPatient = req.body.patientId;
        if ((await checkUserExists(idPatient)) === false) {
            res.status(404).send({ message: "User not found" });
            return;
        }
        const medicalRecords = await getMedicalRecordByIdPatientNetwork(
            idPatient
        );
        res.status(200).send(medicalRecords);
    } catch (error) {
        handleError(500, error, res);
    }
};

export default {
    getAllMedicalRecord,
    getMedicalRecordByIdDoctor,
    getMedicalRecordByIdPatient,
};
