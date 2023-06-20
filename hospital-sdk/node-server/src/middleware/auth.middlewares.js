import jwt from "jsonwebtoken";
import handleError from "./error.middewares.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const verifyToken = (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        if (token) {
            if (!token.includes("Bearer")) {
                throw new Error();
            }
            token = token.replace("Bearer ", "");
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: "Unauthorized!" });
                }
                console.log(decoded, "decoded");
                req.user = decoded.id;
                next();
            });
        } else {
            handleError(401, "unauthorize", res);
        }
    } catch (e) {
        handleError(401, "invalid token", res);
    }
};

const verifyRole = (role) => (req, res, next) => {
    let user = req.user;
    if (user.roles == role) {
        next();
    } else {
        handleError(403, "access denied", res);
    }
};

const checkDuplicateUsernameOrEmail =
    (model, field) => async (req, res, next) => {
        try {
            const value = req.body[field];
            const user = await model.findOne({ [field]: value });
            if (user) {
                return res.status(409).json({
                    message: `The ${field} is already in use`,
                });
            }
            next();
        } catch (error) {
            handleError(500, error, res);
        }
    };

const checkUserExists = (field) => async (req, res, next) => {
    try {
        const value = field === "id" ? req.id : req.body[field];
        const user = await User.findOne({ [field]: value });
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error, "error in check user exists");
        handleError(500, error, res);
    }
};

const checkPassword = async (req, res, next) => {
    try {
        const user = req.user;
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
            });
        }
        next();
    } catch (error) {
        console.log(error, "error in check password");
        handleError(500, error, res);
    }
};

const checkResetToken = async (req, res, next) => {
    try {
        const user = await User.findOne({
            confirmationCode: req.body.confirmationCode,
            resetTokenExpiry: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(409).json({
                message: `The reset token is invalid or has expired`,
            });
        }
        req.user = user;
        next();
    } catch (error) {
        handleError(500, error, res);
    }
};

export default {
    verifyToken,
    verifyRole,
    checkDuplicateUsernameOrEmail,
    checkResetToken,
    checkUserExists,
    checkPassword,
};
