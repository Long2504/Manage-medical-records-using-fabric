import Patient from "../models/patient.js";
import User from "../models/user.js";
import { checkFormatDate, checkFormatId } from "../utils/common.js";

const checkFieldUpdateDataPatient = async (data) => {
  const { name, dateOfBirth, phone, address, userID } = data;
  if (!name || !dateOfBirth || !phone || !address || !userID) {
    return {
      status: 400,
      error: "Missing field",
    };
  }
  if (!checkFormatDate(dateOfBirth)) {
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
  const user = await User.findOne({ _id: user });
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
    const patient = new Patient(data);
    return await patient.save();
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export default {
  checkFieldUpdateDataPatient, updateDataPatient
};