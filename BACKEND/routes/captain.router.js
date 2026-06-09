const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const captainController = require("../controllers/captain.controller");

router.post("/register" , [
    body("fullname").isLength({min : 3}).withMessage("fullname should be at least 3 characters"),
    body("email").isEmail().withMessage("invalid email format"),
    body("password").isLength({min : 6}).withMessage("password should be at least 6 characters"),
    body("vehicle.color").isLength({min : 3}).withMessage("vehicle color should be at least 3 characters"),
    body("vehicle.plate").isLength({min : 3}).withMessage("vehicle plate should be at least 3 characters"),
    body("vehicle.capacity").isInt({min : 1}).withMessage("vehicle capacity should be at least 1"),
    body("vehicle.vehicleType").isIn(["car" , "bike" , "auto"]).withMessage("invalid vehicle type"),
] , require("../controllers/captain.controller").registerCaptain)



module.exports = router;