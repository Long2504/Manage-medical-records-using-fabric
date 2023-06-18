import ScheduleDoctor from "../models/scheduleDoctor.js";
import Test from "../models/test.js";
import scheduleServices from "../services/schedule.services.js";
import handleError from "../middleware/error.middewares.js";
import validationServices from "../services/validation.services.js";

const arrayTime = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
];
const update = async (req, res) => {
    try {
        const schedule = await Test.findOneAndUpdate(
            {
                _id: "6455bfe9c8bad41bd43dc58c",
                "time.0": true,
            },
            {
                $set: {
                    "time.0": false,
                    name: "long",
                },
            },
            { new: true }
        );
        console.log(schedule, "schedule");
        const a = await Test.findOne({ _id: "6455bfe9c8bad41bd43dc58c" });
        // console.log(a, "a");
        res.status(201).send(a);
    } catch (error) {
        handleError(500, error, res);
    }
};
// const createScheduleDoctor = async (req, res) => {
// 	try {
// 		const schedule = {
// 			appointmentDate: req.body.appointmentDate,
// 			appoinmentTime: req.body.appoinmentTime,
// 			doctorID: req.body.doctorID,
// 			specialityID: req.body.specialityID,
// 			patientID: req.body.patientID,
// 			status: req.body.status,
// 			description: req.body.description,
// 		};
// 		const checkScheduleExists =
// 			await scheduleServices.checkScheduleExistsOfSpeciality(
// 				req.body.specialityID,
// 				req.body.appointmentDate,
// 				req.body.appoinmentTime
// 			);
// 		// await scheduleServices.createAppointmentSchedule(schedule);
// 		res.status(201).send(checkScheduleExists);
// 	} catch (error) {
// 		handleError(500, error, res);
// 	}
// };
// const createScheduleDoctor = async (req, res) => {
// 	try {
// 		const scheduleDoctor = [
// 			{
// 				specialityID: "64532f139ec3cad23c35c886",
// 				doctorID: "64532f139ec3cad23c35c886",
// 				appointmentDate: "2021-05-01",
// 				appointmentTime: timeArray,
// 			},
// 			{
// 				specialityID: "64532f139ec3cad23c35c886",
// 				doctorID: "64532f139ec3cad23c35c886",
// 				appointmentDate: "2021-05-01",
// 				appointmentTime: timeArray,
// 			},
// 			{
// 				specialityID: "64532f139ec3cad23c35c886",
// 				doctorID: "64532f139ec3cad23c35c886",
// 				appointmentDate: "2021-05-01",
// 				appointmentTime: timeArray,
// 			},
// 			{
// 				specialityID: "64532f139ec3cad23c35c886",
// 				doctorID: "64532f139ec3cad23c35c886",
// 				appointmentDate: "2021-05-01",
// 				appointmentTime: timeArray,
// 			},
// 			{
// 				specialityID: "64532f139ec3cad23c35c886",
// 				doctorID: "64532f139ec3cad23c35c886",
// 				appointmentDate: "2021-05-01",
// 				appointmentTime: timeArray,
// 			},
// 			{
// 				specialityID: "64532f139ec3cad23c35c886",
// 				doctorID: "64532f139ec3cad23c35c886",
// 				appointmentDate: "2021-05-01",
// 				appointmentTime: timeArray,
// 			},
// 			{
// 				specialityID: "64532f139ec3cad23c35c886",
// 				doctorID: "64532f139ec3cad23c35c886",
// 				appointmentDate: "2021-05-01",
// 				appointmentTime: timeArray,
// 			},
// 			{
// 				specialityID: "64532f139ec3cad23c35c886",
// 				doctorID: "64532f139ec3cad23c35c886",
// 				appointmentDate: "2021-05-01",
// 				appointmentTime: timeArray,
// 			},
// 			{
// 				specialityID: "64532f139ec3cad23c35c886",
// 				doctorID: "64532f139ec3cad23c35c886",
// 				appointmentDate: "2021-05-01",
// 				appointmentTime: timeArray,
// 			},
// 			{
// 				specialityID: "64532f139ec3cad23c35c886",
// 				doctorID: "64532f139ec3cad23c35c886",
// 				appointmentDate: "2021-05-01",
// 				appointmentTime: timeArray,
// 			},
// 			{
// 				specialityID: "64532f139ec3cad23c35c886",
// 				doctorID: "64532f139ec3cad23c35c886",
// 				appointmentDate: "2021-05-01",
// 				appointmentTime: timeArray,
// 			},
// 		];
// 		for (const item of scheduleDoctor) {
// 			const scheupdateduleDoctor = new ScheduleDoctor(item);
// 			await scheduleDoctor.save();
// 		}
// 		res.status(201).send("DONE");
// 	} catch (error) {
// 		handleError(500, error, res);
// 	}
// };

// done
const getScheduleBySpeciality = async (req, res) => {
    try {
        const specialityID = req.body.specialityID;
        const appointmentDate = req.body.appointmentDate;
        const arrayTime = await scheduleServices.getScheduleBySpeciality(
            specialityID,
            appointmentDate
        );
        res.status(200).send(arrayTime);
    } catch (error) {
        console.error("error in getScheduleBySpeciality",error);
        handleError(500, error, res);
    }
};
//done
const getScheduleByDoctor = async (req, res) => {
    try {
        const doctorID = req.body.doctorID;
        const appointmentDate = req.body.appointmentDate;
        let listTime = await scheduleServices.getScheduleByDoctor(
            doctorID,
            appointmentDate
        );
        if (!listTime) {
            listTime = arrayTime;
        }
        res.status(200).send(listTime);
    } catch (error) {
        handleError(500, error, res);
    }
};
//done
const createAppointmentScheduleBySpeciality = async (req, res) => {
    try {
        const specialityId = req.body.specialityID;
        const appointmentDate = req.body.appointmentDate;
        const appointmentTime = req.body.appointmentTime;
        const patientID = req.body.patientID;
        const errorCheckCreate = await scheduleServices.checkCreateScheduleBySpeciality(specialityId, appointmentDate, appointmentTime,patientID);
        if (errorCheckCreate) {
            return res.status(errorCheckCreate.status).send(errorCheckCreate.message);
        }
        const scheduleDoctor =
            await scheduleServices.createOrUpdateScheduleDoctor(
                specialityId,
                appointmentDate,
                appointmentTime
            );
        if (!scheduleDoctor) {
            res.status(200).send({message:"Không có lịch trống"});
            return;
        }
        const schedule = {
            patientID: req.body.patientID,
            specialityID: scheduleDoctor.specialityID,
            doctorID: scheduleDoctor.doctorID,
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime,
            status: req.body.status,
            description: req.body.description,
        };
        await scheduleServices.createAppointmentSchedule(schedule);
        res.status(200).send(schedule);
    } catch (error) {
        handleError(500, error, res);
    }
};
// done
const createAppointmentScheduleByDoctor = async (req, res) => {
    try {
        const doctorId = req.body.doctorID;
        const appointmentDate = req.body.appointmentDate;
        const appointmentTime = req.body.appointmentTime;
        const scheduleOfDoctor = await scheduleServices.getScheduleByDoctor(
            doctorId,
            appointmentDate
        );
        // if schedule of doctor is empty
        if (scheduleOfDoctor === false) {
            await scheduleServices.handleAndCreateScheduleDocTor(
                doctorId,
                req.body.specialityID,
                appointmentDate,
                appointmentTime
            );
            const schedule = {
                patientID: req.body.patientID,
                specialityID: req.body.specialityID,
                doctorID: req.body.doctorID,
                appointmentDate: appointmentDate,
                appointmentTime: appointmentTime,
                status: req.body.status,
                description: req.body.description,
            };
            const appointmentSchedule =
                await scheduleServices.createAppointmentSchedule(schedule);
            res.status(200).send(appointmentSchedule);
        }
    } catch (error) {
        handleError(500, error, res);
    }
};

const createAppointmentSchedule = async (req, res) => {
    try {

        const specialityId = req.body.specialityID;
        const appointmentDate = req.body.appointmentDate;
        const appointmentTime = req.body.appointmentTime;
        const patientID = req.body.patientID;
        const doctorId = req.body.doctorID;
        const errorCheckCreate = await scheduleServices.checkCreateScheduleBySpeciality(specialityId, appointmentDate, appointmentTime,patientID);
        if (errorCheckCreate) {
            return res.status(errorCheckCreate.status).send(errorCheckCreate.message);
        }
        const errorCheckExist = await validationServices.checkExistOfCreateSchedule(specialityId,patientID);
        if(errorCheckExist){
            return res.status(errorCheckExist.status).send(errorCheckExist.message);
        }
        // create doctor schedule
        console.log("doctorId",doctorId);
        if(doctorId){
            const errorIsDoctor = await validationServices.isDoctorOfCreateSchedule(doctorId);
            if(errorIsDoctor){
                return res.status(errorIsDoctor.status).send(errorIsDoctor.message);
            }
            const scheduleOfDoctor = await scheduleServices.getScheduleByDoctor(
                doctorId,
                appointmentDate
            );
            // if schedule of doctor is empty
            if (scheduleOfDoctor === false) {
                await scheduleServices.handleAndCreateScheduleDocTor(
                    doctorId,
                    req.body.specialityID,
                    appointmentDate,
                    appointmentTime
                );
                const schedule = {
                    patientID: req.body.patientID,
                    specialityID: req.body.specialityID,
                    doctorID: req.body.doctorID,
                    appointmentDate: appointmentDate,
                    appointmentTime: appointmentTime,
                    status: req.body.status,
                    description: req.body.description,
                };
                const appointmentSchedule =
                    await scheduleServices.createAppointmentSchedule(schedule);
                res.status(200).send(appointmentSchedule);
            }
        }
        // create schedule by speciality
        if (errorCheckCreate) {
            return res.status(errorCheckCreate.status).send(errorCheckCreate.message);
        }
        const scheduleDoctor =
            await scheduleServices.createOrUpdateScheduleDoctor(
                specialityId,
                appointmentDate,
                appointmentTime
            );
        if (!scheduleDoctor) {
            res.status(200).send({message:"Không có lịch trống"});
            return;
        }
        const schedule = {
            patientID: req.body.patientID,
            specialityID: scheduleDoctor.specialityID,
            doctorID: scheduleDoctor.doctorID,
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime,
            status: req.body.status,
            description: req.body.description,
        };
        await scheduleServices.createAppointmentSchedule(schedule);
        return res.status(200).send(schedule);
    } catch (error) {
        handleError(500, error, res);
    }
};

const checkUpdate = async (req, res) => {
    try {
        const scheduleID = req.body.scheduleID;
        const index = 0;
        //find schedule doctor by id and update AppointmentTime at index of array
        const schedule = await ScheduleDoctor.findByIdAndUpdate(
            scheduleID,
            {
                $set: {
                    appointmentTime: req.body.appointmentTime,
                },
            },
            {
                new: true,
            }
        );
        res.status(200).send(schedule);
    } catch (error) {
        handleError(500, error, res);
    }
};

export default {
    update,
    getScheduleBySpeciality,
    getScheduleByDoctor,
    createAppointmentScheduleBySpeciality,
    createAppointmentScheduleByDoctor,
    createAppointmentSchedule,
    checkUpdate,
};
