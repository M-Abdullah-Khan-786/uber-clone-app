const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerUser, loginUser, getProfile, logoutUser } = require("../controllers/user.controller");
const { authenticateUser } = require("../middlewares/auth.middleware");

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
  ],
  registerUser
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginUser
);

router.get("/profile",authenticateUser, getProfile)
router.get("/logout", logoutUser)

module.exports = router;
