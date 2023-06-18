import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const Patient = mongoose.model("patient", patientSchema);

export default Patient;