const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const {
  creatingRide,
  gettingfares,
  confirmedRide,
  startingRide,
  endingRide,
} = require("../controllers/ride.controller");
const {
  authenticateUser,
  authenticateDriver,
} = require("../middlewares/auth.middleware");

router.post(
  "/create",
  authenticateUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "moto"])
    .withMessage("Invalid vehicle type"),
  creatingRide
);

router.get(
  "/get-fare",
  authenticateUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  gettingfares
);

router.post(
  "/confirm",
  authenticateDriver,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  confirmedRide
);

router.get(
  "/start-ride",
  authenticateDriver,
  query("rideId").isMongoId().withMessage("Invalid ride id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
  startingRide
);

router.post(
  "/end-ride",
  authenticateDriver,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  endingRide
);

module.exports = router;
