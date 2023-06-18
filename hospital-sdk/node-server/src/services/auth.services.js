import User from "../models/user.js";

const createUser = async (user) => {
  try {
    const newUser = new User({
      username: user.username,
      email: user.email,
      password: user.password,
      status: user.status,
      roles: user.roles,
    });
    return await newUser.save();
  } catch (error) {
    console.error(error);
  }
}

const checkUser = async (user) => {
  try {
    if (user.username && user.email) {
      const userNew = await User.findOne({ username: user.username });
      if (userNew) {
        return {
          error: "username is exist",
          status: 400
        }
      }
      return false;
    }
    return {
      error: "username or email is empty",
      status: 400
    }
  } catch (error) {
    console.error("error in checkUser", error);
    return {
      error: error,
      status: 500
    }
  }

}

const getUserByUserName = async (userName) => {
  try {
    const user = await User.findOne({ username: userName });
    return user;
  }
  catch (error) {
    console.error(error);
  }
};
export default {
  getUserByUserName,
  createUser,
  checkUser,
};
