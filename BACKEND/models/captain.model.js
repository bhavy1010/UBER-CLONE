const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "firstname should be at least 3 characters"]
        },
        lastname: {
            type: String,
            minlength: [3, "lastname should be at least 3 characters"]
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "is invalid"]
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    socketId: {
        type: String
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "color should be at least 3 characters"]
        },

        plate: {
            type: String,
            required: true,
            minlength: [3, "plate should be at least 3 characters"]
        },

        capacity: {
            type: Number,
            required: true,
            min: [1, "capacity should be at least 1"]
        },

        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "bike", "auto"]
        }
    },

    location: {
        lat: {
            type: Number
        },

        lng: {
            type: Number
        }
    }
});

captainSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );
};

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("Captain", captainSchema);

module.exports = captainModel;