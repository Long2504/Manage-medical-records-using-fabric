import Speciality from "../models/speciality.js";
import Doctor from "../models/doctor.js";
import ScheduleDoctor from "../models/scheduleDoctor.js";
import AppointmentSchedule from "../models/appointmentSchedule.js";
import { checkFormatId, checkFormatTime, checkFormatDate, randomElement } from "../utils/common.js";
import patientServices from "./patient.services.js";

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

const arrayTimeBoolean = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
];

const getIndexOfArrayTime = (time) => {
    return arrayTime.indexOf(time);
};

const getIdDoctorHaveScheduleEmpty = async (specialityId, Date, Time) => {
    const scheduleSpeciality = await ScheduleDoctor.find(
        {
            specialityID: specialityId,
            appointmentDate: Date,
        },
        "appointmentTime doctorID"
    );

    if (scheduleSpeciality.length === 0) return false;
    const indexOfTime = getIndexOfArrayTime(Time);
    let minCountTime = scheduleSpeciality[0].numberOfVisits;
    let idDoctor = scheduleSpeciality[0].doctorID;
    if (scheduleSpeciality.length === 1) {
        if (scheduleSpeciality[0].appointmentTime[indexOfTime]) {
            return false;
        }
        return idDoctor;
    }

    for (let i = 1; i < scheduleSpeciality.length; i++) {
        if (!scheduleSpeciality[i].appointmentTime[indexOfTime]) {
            if (scheduleSpeciality[i].numberOfVisits < minCountTime) {
                minCountTime = scheduleSpeciality[i].numberOfVisits;
                idDoctor = scheduleSpeciality[i].doctorID;
            }
        }
        return idDoctor;
    }
};

// check field of schedule doctor is empty
const checkCreateScheduleBySpeciality = async (specialityId, Date, Time, patientID) => {
    if (specialityId && Date && Time && patientID) {
        if (!checkFormatId(specialityId) || !checkFormatId(patientID)) {
            return {
                status: 400,
                error: "SpecialityID or patientID is not valid",
            };
        }
        if (!checkFormatTime(Time)) {
            return {
                status: 400,
                error: "Time is not valid",
            };
        }
        if (!checkFormatDate(Date)) {
            return {
                status: 400,
                error: "Date is not valid",
            };
        }
        return false;
    }
    return {
        status: 400,
        error: "Field is empty",
    }

};

// const checkCreateScheduleByDoctor = async (doctorID, Date, Time,patientID) => {


const getScheduleBySpeciality = async (specialityId, Date) => {
    const scheduleSpeciality = await ScheduleDoctor.find(
        {
            specialityID: specialityId,
            appointmentDate: Date,
        },
        "appointmentTime"
    );
    console.log(scheduleSpeciality,
        "scheduleSpeciality");
    // Speciality have many doctor
    // get time of first doctor
    // check time of other doctor with time of first doctor
    // if time of first doctor is false => have schedule empty
    // if time of first doctor is true => check time of other doctor
    if (scheduleSpeciality.length > 0) {
        const arrayCheck = scheduleSpeciality[0].appointmentTime;
        for (let i = 0; i < arrayCheck.length; i++) {
            if (arrayCheck[i] === true) {
                for (let j = 1; j < scheduleSpeciality.length; j++) {
                    if (scheduleSpeciality[j].appointmentTime[i] === false) {
                        arrayCheck[i] = false;
                        break;
                    }
                }
            }
        }
        return handleTimeFromDB(arrayCheck);
    }
    // Speciality have one doctor
    return handleTimeFromDB(arrayTime);
};

//get schedule by doctorID
const getScheduleByDoctor = async (doctorId, Date) => {
    try {
        const scheduleDoctor = await ScheduleDoctor.findOne({
            doctorID: doctorId,
            appointmentDate: Date,
        });
        console.log(scheduleDoctor, "scheduleDoctor");
        //if doctor have not schedule => return arrayTime (full schedule)
        if (!scheduleDoctor) return false;
        return handleTimeFromDB(scheduleDoctor.appointmentTime);
    } catch (error) {
        console.log(error, "getScheduleByDoctor error");
    }
};

const getScheduleOfDoctor = async (doctorId, Date) => {

    try {
        const scheduleDoctor = await ScheduleDoctor.findOne({
            doctorID: doctorId,
            appointmentDate: Date,
        });
        //if doctor have not schedule => return arrayTime (full schedule)
        if (!scheduleDoctor) return false;
        return {
            appointmentTime: scheduleDoctor.appointmentTime,
            id: scheduleDoctor._id,
        };
    } catch (error) {
        console.log(error, "getScheduleByDoctor error");
    }
};


// check if doctor have schedule empty in speciality => return true
const handleTimeFromDB = (times) => {
    for (let i = 0; i < times.length; i++) {
        if (!times[i]) {
            times[i] = arrayTime[i];
        }
    }
    return times;
};
// create schedule doctor
/*const createScheduleDoctor = async (scheduleDoctor) => {
    const scheduleOfDoctor = getScheduleByDoctor(
        scheduleDoctor.doctorID,
        scheduleDoctor.appointmentDate
    );
    if (scheduleDoctor !== false) {
        if (
            scheduleDoctor.appointmentTime[
                getIndexOfArrayTime(scheduleDoctor.appointmentTime)
            ]
        ) {
            return false;
        } else {
        }
    }

    const schedule = new ScheduleDoctor(scheduleDoctor);
    await schedule.save();
};*/

// update schedule doctor
const UpdateScheduleDoctor = async (scheduleDoctor, appoinmentTimeArray) => {
    try {
        const schedule = await ScheduleDoctor.findByIdAndUpdate(
            scheduleDoctor._id,
            {
                $set: {
                    appointmentTime: appoinmentTimeArray,
                },
            },
            { new: true }
        );
        return schedule;
    } catch (error) {
        console.error(error);
    }
};

// create schedule doctor
const createDoctorSchedule = async (schedule) => {
    try {
        const scheduleDoctor = new ScheduleDoctor(schedule);
        await scheduleDoctor.save();
        return scheduleDoctor;
    } catch (error) {
        console.error(error);
    }
};

//create schedule doctor if doctor have not schedule into ScheduleDoctor
//update schedule doctor if doctor have schedule into ScheduleDoctor
//done
const createOrUpdateScheduleDoctor = async (specialityId, Date, Time) => {
    const ListDoctors = await Doctor.find({ specialityID: specialityId });
    const ListDoctorsHaveSchedule = await ScheduleDoctor.find({
        specialityID: specialityId,
        appointmentDate: Date,
    });
    // list doctor have schedule empty
    let listDoctorScheduling = [];
    console.log(listDoctorScheduling);
    const index = getIndexOfArrayTime(Time);
    //case : list doctor have schedule = list doctor (all doctor have schedule)
    if (ListDoctors.length === ListDoctorsHaveSchedule.length) {
        for (let i = 0; i < ListDoctorsHaveSchedule.length; i++) {
            if (ListDoctorsHaveSchedule[i].appointmentTime[index] === false) {
                listDoctorScheduling.push(ListDoctorsHaveSchedule[i]);
            }
        }
        // no doctor have schedule empty => return false
        if (listDoctorScheduling.length === 0) return false;
        const scheduleDoctor =
            listDoctorScheduling[randomElement(listDoctorScheduling.length)];
        const appoinmentTime = scheduleDoctor.appointmentTime;
        appoinmentTime[index] = true;

        const scheduleDoctorUpdate = await UpdateScheduleDoctor(
            scheduleDoctor,
            appoinmentTime
        );
        return scheduleDoctorUpdate;
    }
    //case : list doctor have schedule < list doctor (have doctor have not schedule)
    else {
        for (let i = 0; i < ListDoctors.length; i++) {
            let check = true;
            for (let j = 0; j < ListDoctorsHaveSchedule.length; j++) {
                if (
                    ListDoctors[i]._id === ListDoctorsHaveSchedule[j].doctorID
                ) {
                    check = false;
                    ListDoctorsHaveSchedule[j].doctorID = 0;
                    break;
                }
            }
            if (check) {
                listDoctorScheduling.push(ListDoctors[i]);
            }
        }
        if (listDoctorScheduling.length === 0) return false;
        const doctor =
            listDoctorScheduling[randomElement(listDoctorScheduling.length)];
        const appoinmentTime = arrayTimeBoolean;
        appoinmentTime[index] = true;
        const scheduleDoctor = {
            doctorID: doctor._id,
            specialityID: doctor.specialityID,
            appointmentDate: Date,
            appointmentTime: appoinmentTime,
            numberOfVisits: 1,
        };
        const scheduleDoctorCreate = await createDoctorSchedule(scheduleDoctor);
        return scheduleDoctorCreate;
    }
};

//create appointment schedule for patient
const createAppointmentSchedule = async (schedule) => {
    try {
        const scheduleAppointment = new AppointmentSchedule(schedule);
        await scheduleAppointment.save();
        return scheduleAppointment;
    } catch (error) {
        console.error(error);
    }
};

const handleAndCreateScheduleDocTor = async (
    doctorId,
    specialityId,
    Date,
    Time
) => {
    try {
        const appoinmentTime = arrayTimeBoolean;
        const index = getIndexOfArrayTime(Time);
        appoinmentTime[index] = true;
        const scheduleDoctor = {
            doctorID: doctorId,
            specialityID: specialityId,
            appointmentDate: Date,
            appointmentTime: appoinmentTime,
            numberOfVisits: 1,
        };
        const scheduleDoctorCreate = await createDoctorSchedule(scheduleDoctor);
        return scheduleDoctorCreate;
    } catch (error) {
        console.error(error);
    }
};

const handleAndUpdateScheduleDocTor = async (
    id,
    appoinmentTimeArray,
    appoinmentTime,
) => {
    try {
        const index = getIndexOfArrayTime(appoinmentTime.toString());
        appoinmentTimeArray[index] = true;
        await ScheduleDoctor.findByIdAndUpdate(id, {
            $set: {
                appointmentTime: appoinmentTimeArray,
            },
        });
    }
    catch (error) {
        console.error(error, "error in handleAndUpdateScheduleDocTor");
    }
};

const getAppointmentScheduleByDoctor = async (doctorId, Date) => {
    try {
        const scheduleDoctor = await AppointmentSchedule.find({
            doctorID: doctorId,
            appointmentDate: Date,
            status: "booked",
        });
        console.log(scheduleDoctor, "scheduleDoctor");
        const result = [];
        for (let i = 0; i < scheduleDoctor.length; i++) {
            const patient = await patientServices.getPatientById(
                scheduleDoctor[i].patientID
            );
            result.push({
                patient: patient,
                scheduleDoctor: scheduleDoctor[i],
            });
        }
        return result;
    } catch (error) {
        console.error(error);
        return {
            error: error,
            status: 500,
        }
    }

};

const updateStatusAppointmentSchedule = async (id, status) => {
    try {
        const schedule = await AppointmentSchedule.findByIdAndUpdate(
            id,
            {
                $set: {
                    status: status,
                },
            },
            { new: true }
        );
        return schedule;
    }
    catch (error) {
        console.error(error);
    }
};

export default {
    getScheduleBySpeciality,
    getScheduleByDoctor,
    getScheduleOfDoctor,
    createDoctorSchedule,
    createOrUpdateScheduleDoctor,
    createAppointmentSchedule,
    handleAndCreateScheduleDocTor,
    handleAndUpdateScheduleDocTor,
    checkCreateScheduleBySpeciality,
    getAppointmentScheduleByDoctor,
    updateStatusAppointmentSchedule
};
