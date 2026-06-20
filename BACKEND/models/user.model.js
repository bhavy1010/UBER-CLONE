const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "proton.me",
    "protonmail.com"
];

const userSchema = new mongoose.Schema({

    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters"]
        },

        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters"]
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

        validate: {
            validator: function (email) {

                const domain =
                    email.split("@")[1];

                return allowedDomains.includes(
                    domain
                );
            },

            message:
                "Please use a valid email provider"
        }
    },

    password: {
        type: String,
        required: true,

        validate: {
            validator: function (password) {

                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/.test(
                    password
                );
            },

            message:
                "Password must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
        }
    },

    socketId: {
        type: String
    }

},
{
    timestamps: true
});

userSchema.methods.generateAuthToken =
function () {

    return jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );
};

userSchema.methods.comparePassword =
async function (password) {

    return await bcrypt.compare(
        password,
        this.password
    );
};

userSchema.statics.hashPassword =
async function (password) {

    return await bcrypt.hash(
        password,
        10
    );
};

const userModel =
mongoose.model(
    "user",
    userSchema
);

module.exports = userModel;