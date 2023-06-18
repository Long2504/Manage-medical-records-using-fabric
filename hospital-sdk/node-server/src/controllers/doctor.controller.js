import doctorServices from "../services/doctor.services.js";
import Speciality from "../models/speciality.js";
import handleError from "../middleware/error.middewares.js";
import { doctors } from "../../data/doctor.js";
import Doctor from "../models/doctor.js";
import {
    checkUserExists,
    createMedicalRecordNetwork,
    registerUser,
    updateMedicalRecordNetwork,
} from "../../../fabric-network/app.js";
import medicalRecordServices from "../services/medicalRecord.services.js";
import moment from "moment";
import mongoose from "mongoose";
const createDoctor = async (req, res) => {
    try {
        const doctor = {
            name: "longdsgsdasadfsdafdfs",
            phone: "12345asdfdsadfasdfs6789",
            address: "12asdfasd3",
            specialityID: "64532f139ec3cad23c35c886",
            description: "123",
        };
        await doctorServices.create(doctor);
        res.status(201).send(doctor);
    } catch (error) {
        handleError(500, error, res);
    }
};

const initDoctor = async (req, res) => {
    try {
        const specialities = await Speciality.find();
        console.log(specialities);
        console.log(doctors);
        for (let i = 0; i < doctors.length; i++) {
            for (let j = 0; j < specialities.length; j++) {
                if (doctors[i].specialityID === specialities[j].name) {
                    const doctor = new Doctor({
                        name: doctors[i].name,
                        specialityID: specialities[j]._id,
                        phone: "123",
                        address: "Đà Nẵng",
                        certifications: doctors[i].certificate,
                        description: doctors[i].description,
                        experiences: doctors[i].experiences,
                    });
                    await doctor.save();
                    break;
                }
            }
        }
        return res.status(200).send("ok");
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
        return res.status(201).send(medicalRecord);
    } catch (error) {
        handleError(500, error, res);
    }
};

const updateMedicalRecord = async (req, res) => {
    try {
        const medicalRecord = {
            medicalRecordID: req.body.medicalRecordID,
            symptonOfDisease: req.body.symptonOfDisease,
            diagosisOfDoctor: req.body.diagosisOfDoctor,
            treatmentProcess: req.body.treatmentProcess,
            diseaseProgression: req.body.diseaseProgression,
            prescription: req.body.prescription,
            note: req.body.note,
        };
        // check doctor exists in network

        if (!checkUserExists(req.body.doctorID)) {
            return res.status(400).send({
                message: "Doctor does not exist",
            });
        }
        //check patient exists in network
        if (!checkUserExists(medicalRecord.patientID)) {
            return res.status(400).send({
                message: "Patient does not exist",
            });
        }
        const responeupdateMedicalRecordNetworkr =
            await updateMedicalRecordNetwork(medicalRecord, req.body.doctorID);
        if (responeupdateMedicalRecordNetworkr.error) {
            return res.status(responeError.status).send({
                message: responeupdateMedicalRecordNetworkr.error,
            });
        }
        res.status(200).send(responeupdateMedicalRecordNetworkr);
    } catch (error) {
        handleError(500, error, res);
    }
};

const getAllMedicalRecord = async (req, res) => {
    try {
        const idDoctor = req.body.doctorID;
        if ((await checkUserExists(idDoctor)) === false) {
            return res.status(400).send({
                message: "Doctor does not exist",
            });
        }
        const medicalRecords =
            await medicalRecordServices.getAllMedicalRecord();
        res.status(200).send(medicalRecords);
    } catch (error) {
        handleError(500, error, res);
    }
};

const createMedicalRecordWithTest = async (req, res) => {
    try {
        const medicalRecord = {
            resultTestAndPhotos: {
                test: {
                    testID: {}
                }
            }
        };
        // check doctor exists in network

        if (!checkUserExists(req.body.doctorID)) {
            return res.status(400).send({
                message: "Doctor does not exist",
            });
        }
        //check patient exists in network
        if (!checkUserExists(medicalRecord.patientID)) {
            return res.status(400).send({
                message: "Patient does not exist",
            });
        }
        const responeupdateMedicalRecordNetworkr =
            await updateMedicalRecordNetwork(medicalRecord, req.body.doctorID);
        if (responeupdateMedicalRecordNetworkr.error) {
            return res.status(responeError.status).send({
                message: responeupdateMedicalRecordNetworkr.error,
            });
        }
        res.status(200).send(responeupdateMedicalRecordNetworkr);
    } catch (error) {
        handleError(500, error, res);
    }
};

const updateMedicalRecordWithTestAndPhoto = async (req, res) => {
    try {
        const medicalRecord = {
            medicalRecordID: req.body.medicalRecordID,
            resultTestAndPhotos: {
                test: {
                    idDoctor: req.body.idDoctor,
                    bloodGlucose: {
                        value: req.body.bloodGlucose.value,
                    },
                    bloodPressure: {
                        value: req.body.bloodPressure.value,
                    },
                    bodyTemperature: {
                        value: req.body.bodyTemperature.value,
                    },
                    heartRate: {
                        value: req.body.heartRate.value,
                    },
                    weight: {
                        value: req.body.weight.value,
                    },
                    height: {
                        value: req.body.height.value,
                    },
                    BMI: {
                        value: req.body.BMI.value,
                    },
                    bloodType: {
                        value: req.body.bloodType.value,
                    },
                },
                photo: {
                    idDoctor: '',
                }
            }
        };
        // check doctor exists in network
    } catch (error) {
        handleError(500, error, res);
    }
};

const getDoctorsBySpeciality = async (req, res) => {
    try {
        const specialityID = req.body.specialtyId;
        console.log(specialityID);
        if (!specialityID)
            return res.status(400).send({
                message: "SpecialityID is required",
            });
        // check speciality in correct format mongo
        if (!mongoose.Types.ObjectId.isValid(specialityID))
            return res.status(400).send({
                message: "SpecialityID is not correct format",
            });

        const doctors = await doctorServices.getDoctorByIdSpeciality(
            specialityID
        );
        res.status(200).send(doctors);
    } catch (error) {
        handleError(500, error, res);
    }
};

const getAllDoctor = async (req, res) => {
    try {
        const doctors = await doctorServices.getAllDoctor();
        res.status(200).send(doctors);
    } catch (error) {
        handleError(500, error, res);
    }
};

const getDoctorNotJoinChannel = async (req, res) => {
    try {
        const doctors = await doctorServices.getDoctorNotJoinChannel();
        res.status(200).send(doctors);
    } catch (error) {
        handleError(500, error, res);
    }
};

export default {
    createDoctor,
    initDoctor,
    createMedicalRecord,
    updateMedicalRecord,
    getAllMedicalRecord,
    getDoctorsBySpeciality,
    getAllDoctor,
    getDoctorNotJoinChannel,
    createMedicalRecordWithTest,
};
