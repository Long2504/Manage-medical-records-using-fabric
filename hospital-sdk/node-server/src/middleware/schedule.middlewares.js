import ScheduleDoctor from "../models/scheduleDoctor";
import Doctor from "../models/doctor";

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
const arrayTimeInDatabase = [
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
];

const checkDoctorExists = async (idDoctor) => {
	try {
		const doctor = await Doctor.findOne({ _id: idDoctor });
		if (!doctor) {
			return false;
		}
		return true;
	} catch (error) {
		console.error(error);
	}
};

const checkScheduleExists = async (idDoctor, day, time) => {
	try {
		const schedule = await ScheduleDoctor.findOne({
			doctorID: idDoctor,
			appointmentDate: day,
			appointmentTime: time,
		});
		if (!schedule) {
			return false;
		}
		return true;
	} catch (error) {
		console.error(error);
	}
};

const createScheduleForDoctor = async (idDoctor, day, time) => {
	try {
		if (checkDoctorExists(idDoctor)) {
			if (checkScheduleExists(idDoctor, day, time)) {
				const schedule = await ScheduleDoctor.findOne({
					doctorID: idDoctor,
					appointmentDate: day,
				});
				schedule.appointmentTime.push(time);
				await schedule.save();
			} else {
				const schedule = new ScheduleDoctor({
					doctorID: idDoctor,
					appointmentDate: day,
					appointmentTime: [time],
				});
				await schedule.save();
			}
		}
	} catch (error) {
		console.error(error);
	}
};

export default { createScheduleForDoctor };
