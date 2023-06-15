import mongoose from "mongoose";

const appointmentScheduleSchema = new mongoose.Schema({
	appointmentDate: {
		type: Date,
		required: true,
	},
	appointmentTime: {
		type: String,
		required: true,
	},
	specialityID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "speciality",
	},
	doctorID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "doctor",
	},
	patientID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	status: {
		type: String,
		enum: ["booked", "cancelled", "completed"],
		default: "booked",
	},
	description: {
		type: String,
	},
});

const AppointmentSchedule = mongoose.model(
	"appointmentSchedule",
	appointmentScheduleSchema
);

export default AppointmentSchedule;
