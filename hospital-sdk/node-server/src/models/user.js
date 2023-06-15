import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 3,
        max: 255,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    confirmationCode: {
        type: String,
        unique: true,
    },
    resetTokenExpiry: {
        type: Date,
    },
    password: {
        type: String,
        min: 6,
        max: 1024,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Active"],
        default: "Pending",
    },
    roles: {
        type: String,
        enum: ["user", "doctor", "admin"],
        default: "user",
    },
});

const User = mongoose.model("user", userSchema);

export default User;
