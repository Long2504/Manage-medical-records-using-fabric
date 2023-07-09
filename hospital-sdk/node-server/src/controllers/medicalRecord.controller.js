import {
    getAllMedicalRecordsNetwork,
    checkUserExists,
    getMedicalRecordByIdPatientNetwork,
    getMedicalRecordByIdDoctorNetwork,
} from "../../../fabric-network/app.js";
import handleError from "../middleware/error.middewares.js";
import patientServices from "../services/patient.services.js";
import { checkFormatId } from "../utils/common.js";
import doctorServices from "../services/doctor.services.js";
import moment from "moment";
import { registerUser, createMedicalRecordNetwork } from "../../../fabric-network/app.js";
import scheduleServices from "../services/schedule.services.js";

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
        // const medicalRecords = await getMedicalRecordByIdPatientNetwork(
        //     idPatient
        // );
        const medicalRecords = await getAllMedicalRecordsNetwork("admin");
        const result = [];


        if (medicalRecords.status) {
            if (medicalRecords.status === 404) {
                return res.status(200).send([]);
            }
            if (medicalRecords.status === 500) {
                res.status(medicalRecords.status).send({ message: medicalRecords.error });
                return;
            }
        }
        for (let i = 0; i < medicalRecords.length; i++) {
            if (medicalRecords[i].Record.patientID === idPatient) {
                result.push(medicalRecords[i]);
            }
        }
        return res.status(200).send(result);
    } catch (error) {
        handleError(500, error, res);
    }
};
const createMedicalRecord = async (req, res) => {
    try {
        const date = new Date();
        const utc = moment.utc(date).toDate();
        const dateTime = moment(utc)
            .local()
            .format("dddd, hh:mm:ss, DD/MM/YYYY");
        // check null of fields or not exist
        const errorCheckFields = await doctorServices.checkFieldOfCreateMedicordRecord(req.body.doctorID, req.body.patientID);

        if (errorCheckFields.error) {
            return res.status(errorCheckFields.status).send({
                message: errorCheckFields.error,
            });
        }

        const medicalRecord = {
            medicalRecordID: `MR${Date.now()}`,
            patientID: req.body.patientID,
            doctor: {
                doctorID: req.body.doctorID,
                name: errorCheckFields.name,
            },
            resultTestAndPhotos: {},
            date: dateTime,
            symptonOfDisease: req.body.symptonOfDisease,
            diagosisOfDoctor: req.body.diagosisOfDoctor,
            treatmentProcess: req.body.treatmentProcess,
            diseaseProgression: req.body.diseaseProgression,
            prescription: req.body.prescription,
            note: req.body.note,
        };


        // check doctor join network
        if (!(await checkUserExists(medicalRecord.doctor.doctorID))) {
            res.status(400).send({
                message: "Doctor does not exist",
            });
            return;
        }
        //check patient join network
        if (!(await checkUserExists(medicalRecord.patientID))) {
            await registerUser(medicalRecord.patientID);
        }
        const responeErrorCreate = await createMedicalRecordNetwork(
            medicalRecord
        );
        if (responeErrorCreate) {
            return res.status(responeErrorCreate.status).send({
                message: responeErrorCreate.error,
            });
        }
        await scheduleServices.updateStatusAppointmentSchedule(
            req.body.idSchedule,
            "completed"
        );

        return res.status(201).send(medicalRecord);
    } catch (error) {
        handleError(500, error, res);
    }
};
export default {
    getAllMedicalRecord,
    getMedicalRecordByIdDoctor,
    getMedicalRecordByIdPatient,
    createMedicalRecord,
};
