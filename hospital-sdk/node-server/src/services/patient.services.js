import Patient from "../models/patient.js";
import User from "../models/user.js";
import { checkFormatId } from "../utils/common.js";
import moment from "moment";

const checkFieldUpdateDataPatient = async (data) => {
  const { name, dateOfBirth, phone, address, userID } = data;
  if (!name || !dateOfBirth || !phone || !address || !userID) {
    return {
      status: 400,
      error: "Missing field",
    };
  }
  if (!moment(dateOfBirth, "DD-MM-YYYY", true).isValid()) {
    return {
      status: 400,
      error: "Date of birth is not valid",
    };
  }
  if (!checkFormatId(userID)) {
    return {
      status: 400,
      error: "userID is not valid",
    };
  }
  const user = await User.findOne({ _id: userID });
  if (!user) {
    return {
      status: 404,
      error: "User is not found",
    };
  }
  return false;
};

const updateDataPatient = async (data) => {
  try {
    if (data._id) {
      const patient = await Patient.findByIdAndUpdate(data._id, data, { new: true });
      return patient;
    }
    else {
      const patient = new Patient(data);
      await patient.save();
      return patient;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getPatientByUserId = async (userId) => {
  try {
    const patient = await Patient.findOne({ userID: userId }).select("-__v");
    return patient;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getPatientById = async (patientId) => {
  try {
    const patient = await Patient.findOne({ _id: patientId }).select("-__v");
    return patient;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export default {
  checkFieldUpdateDataPatient, updateDataPatient, getPatientByUserId, getPatientById
};