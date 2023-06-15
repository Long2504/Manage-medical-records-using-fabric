import mongoose from "mongoose";

const scheduleDoctorSchema = new mongoose.Schema({
	specialityID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "speciality",
	},
	doctorID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "doctor",
	},
	appointmentDate: {
		type: Date,
		required: true,
	},
	appointmentTime: {
		type: Array,
		required: true,
	},
	numberOfVisits: {
		type: Number,
		required: true,
	},
});

const ScheduleDoctor = mongoose.model("scheduleDoctor", scheduleDoctorSchema);

export default ScheduleDoctor;
