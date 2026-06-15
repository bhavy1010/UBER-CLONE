const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {

    console.log("========== AUTH USER ==========");
    console.log("Authorization Header:", req.headers.authorization);

    const token =
        req.cookies?.token ||
        req.headers.authorization?.split(" ")[1];

    console.log("Extracted Token:", token);

    if (!token) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token });

    console.log("Blacklisted:", isBlacklisted);

    if (isBlacklisted) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Decoded JWT:", decoded);

        const user = await userModel.findById(decoded._id);

        console.log("Found User:", user);

        if (!user) {
            return res.status(401).json({
                error: "Unauthorized"
            });
        }

        req.user = user;

        next();

    } catch (err) {

        console.log("JWT ERROR:", err.message);

        return res.status(401).json({
            error: "Unauthorized"
        });

    }
};

module.exports.authCaptain = async (req, res, next) => {

    const token =
        req.cookies?.token ||
        req.headers.authorization?.split(" ")[1];

        


    if (!token) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token });

    if (isBlacklisted) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const captain = await captainModel.findById(decoded._id);

        if (!captain) {
            return res.status(401).json({
                error: "Unauthorized"
            });
        }

        req.captain = captain;

        next();

    } catch (err) {

        return res.status(401).json({
            error: "Unauthorized"
        });

    }
};