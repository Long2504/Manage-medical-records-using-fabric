import {
    getAllMedicalRecordsNetwork,
    checkUserExists,
    getMedicalRecordByIdPatientNetwork,
    getMedicalRecordByIdDoctorNetwork,
} from "../../../fabric-network/app.js";
import handleError from "../middleware/error.middewares.js";
import patientServices from "../services/patient.services.js";
import { checkFormatId } from "../utils/common.js";

const getAllMedicalRecord = async (req, res) => {
    try {

        const medicalRecords = await getAllMedicalRecordsNetwork("admin");
        const result = [];
        for (let i = 0; i < medicalRecords.length; i++) {
            console.log(medicalRecords[i].Record);
            if (checkFormatId(medicalRecords[i].Record.patientID)) {
                const patient = await patientServices.getPatientById(
                    medicalRecords[i].Record.patientID
                );
                result.push({ medicalRecords: medicalRecords[i], patient });
            }
        }

        res.status(200).send(result);
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
        const result = [];
        for (let i = 0; i < medicalRecords.length; i++) {
            const patient = await patientServices.getPatientById(
                medicalRecords[i].patientID
            );
            result.push({ medicalRecords: medicalRecords[i], patient });
        }
        res.status(200).send(result);
    } catch (error) {
        handleError(500, error, res);
    }
};

const getMedicalRecordByIdPatient = async (req, res) => {
    try {
        const idPatient = req.body.patientId;
        const patient = await patientServices.getPatientById(idPatient);
        if (!patient) {
            res.status(404).send({ message: "Patient not found" });
            return;
        }
        const medicalRecords = await getMedicalRecordByIdPatientNetwork(
            idPatient
        );
        if (medicalRecords.status) {
            if (medicalRecords.status === 404) {
                return res.status(200).send([]);
            }
            if (medicalRecords.status === 500) {
                res.status(medicalRecords.status).send({ message: medicalRecords.error });
                return;
            }
        }
        return res.status(200).send(medicalRecords);
    } catch (error) {
        handleError(500, error, res);
    }
};

export default {
    getAllMedicalRecord,
    getMedicalRecordByIdDoctor,
    getMedicalRecordByIdPatient,
};
