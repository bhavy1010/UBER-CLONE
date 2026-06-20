const userModel = require("../models/user.model");
const userService = require("../services/user.serrvice");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()
        });
    }
const userModel = require("../models/user.model");
const userService = require("../services/user.serrvice");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { fullname, email, password } = req.body;

        const existingUser =
            await userModel.findOne({
                email: email.toLowerCase()
            });

        if (existingUser) {

            return res.status(409).json({
                message: "User already exists with this email"
            });

        }

        const hashedPassword =
            await userModel.hashPassword(password);

        const user =
            await userService.createUser({
                firstname: fullname.firstname,
                lastname: fullname.lastname,
                email: email.toLowerCase(),
                password: hashedPassword
            });

        const token =
            user.generateAuthToken();

        res.status(201).json({
            token,
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports.loginUser = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        const user =
            await userService.findUserByEmail(
                email.toLowerCase()
            );

        if (!user) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        const isMatch =
            await user.comparePassword(password);

        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        const token =
            user.generateAuthToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            token,
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports.getUserProfile = async (req, res) => {

    res.status(200).json({
        user: req.user
    });

};

module.exports.logoutUser = async (req, res) => {

    try {

        const token =
            req.cookies?.token ||
            req.headers.authorization?.split(" ")[1];

        if (token) {

            await blacklistTokenModel.create({
                token
            });

        }

        res.clearCookie("token");

        res.status(200).json({
            message: "Logged out successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
    const { fullname, email, password } = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({
        token,
        user
    });
};

module.exports.loginUser = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()
        });
    }

    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);

    if (!user) {
        return res.status(401).json({
            error: "Invalid email or password"
        });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({
            error: "Invalid email or password"
        });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        token,
        user
    });
};

module.exports.getUserProfile = async (req, res, next) => {

    res.status(200).json({
        user: req.user
    });

};

module.exports.logoutUser = async (req, res, next) => {

    const token =
        req.cookies.token ||
        req.headers.authorization?.split(" ")[1];

    await blacklistTokenModel.create({
        token
    });

    res.clearCookie("token");

    res.status(200).json({
        message: "Logged out successfully"
    });

};