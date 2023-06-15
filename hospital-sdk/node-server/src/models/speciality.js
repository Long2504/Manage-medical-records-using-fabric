import mongoose from "mongoose";

const specialitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
});

const Speciality = mongoose.model("speciality", specialitySchema);

export default Speciality;
