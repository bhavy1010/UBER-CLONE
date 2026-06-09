const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
    firstName,
    lstName,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType
}) => {

    if (
        !firstName ||
        !lstName ||
        !email ||
        !password ||
        !color ||
        !plate ||
        !capacity ||
        !vehicleType
    ) {
        throw new Error("All fields are required");
    }

    const captain = await captainModel.create({
        fullname: {
            firstname: firstName,
            lastname: lstName
        },

        email,
        password,

        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return captain;
};