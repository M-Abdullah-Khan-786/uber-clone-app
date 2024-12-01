const driverModel = require("../models/driver.model");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blackListToken.model");
const { errorHandle } = require("../middlewares/error.middleware");
//  register the new driver
exports.registerdriver = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errorHandle(400, errors.array()));
  }

  const {
    firstname,
    lastname,
    email,
    password,
    vehicleType,
    vehicleNumber,
    vehicleColor,
    vehicleCapacity,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !vehicleType ||
    !vehicleNumber ||
    !vehicleColor ||
    !vehicleCapacity
  ) {
    return next(errorHandle(400, "Please enter all fields"));
  }

  try {
    const existingdriver = await driverModel.findOne({ email });
    if (existingdriver) {
      return next(errorHandle(400, "Driver already exists"));
    }

    const newdriver = new driverModel({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: await driverModel.hashPassword(password),
      vehicle: {
        vehicleType,
        vehicleNumber,
        vehicleColor,
        vehicleCapacity,
      },
    });

    await newdriver.save();

    const token = await newdriver.generateAuthToken();

    res.status(201).json({
      message: "Driver Created Successfully",
      driver: newdriver,
      token,
    });
  } catch (error) {
    return next(errorHandle(400, error));
  }
};

// login driver
exports.logindriver = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(errorHandle(400, "Please enter all fields"));
    }
    const finddriver = await driverModel.findOne({ email }).select("+password");
    if (!finddriver) {
      return next(errorHandle(401, "email or password is incorrect"));
    }
    const isMatch = await finddriver.comparePassword(password);
    if (!isMatch) {
      return next(errorHandle(401, "email or password is incorrect"));
    }

    const token = await finddriver.generateAuthToken();

    res.cookie("token", token);

    return res.status(200).json({
      message: "Driver logged in successfully",
      driver: finddriver,
      token,
    });
  } catch (error) {
    return next(errorHandle(400, error));
  }
};

// Get the current driver Profile
exports.getProfile = async (req, res, next) => {
  try {
    const driver = req.driver;
    return res.status(200).json({
      message: "Driver Profile Retrieved Successfully",
      driver,
    });
  } catch (error) {
    return next(errorHandle(400, error));
  }
};

// Logout driver
exports.logoutdriver = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blackListTokenModel.create({ token });
  res.clearCookie("token");
  return res.status(200).json({ message: "Driver logged out successfully" });
};
