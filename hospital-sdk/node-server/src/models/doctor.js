import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    specialityID: { type: mongoose.Schema.Types.ObjectId, ref: "speciality" },
    description: {
        type: String,
    },
    certifications: {
        type: Array,
    },
    experiences: {
        type: Array,
    },
    joinedChannel: {
        type: Boolean,
        default: false,
    },
});

const Doctor = mongoose.model("doctor", doctorSchema);

export default Doctor;
