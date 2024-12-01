const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {registerdriver, logindriver, getProfile, logoutdriver } = require("../controllers/driver.controller");
const { authenticateDriver } = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("firstname")
      .isLength({ min: 3 })
      .withMessage("First Name must be at least 3 characters"),
    body("lastname")
      .isLength({ min: 3 })
      .withMessage("Last Name must be at least 3 characters"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicleType").isIn(['car', 'bike', 'auto-rickshaw']).withMessage("Vehicle type must be one of the following"),
    body("vehicleNumber").isLength({ min: 1}).withMessage("Vehicle Number must be at least 1 characters"),
    body("vehicleColor").isLength({ min: 3}).withMessage("Vehicle Color must be at least 3 characters"),
    body("vehicleCapacity").isInt({ min: 3}).withMessage("Vehicle Capacity must be at least 1"),

  ],
  registerdriver
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  logindriver
);

router.get("/profile",authenticateDriver,getProfile )
router.get("/logout", logoutdriver)

module.exports = router;
