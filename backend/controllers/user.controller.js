const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blackListToken.model");
const { errorHandle } = require("../middlewares/error.middleware");

//  register the new user
exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errorHandle(400, errors.array()));
  }

  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return next(errorHandle(400, "Please enter all fields"));
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next(errorHandle(400, "User already exists"));
    }

    const newUser = new userModel({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: await userModel.hashPassword(password),
    });

    await newUser.save();

    const token = await newUser.generateAuthToken();

    res
      .status(201)
      .json({ message: "User Created Successfully", user: newUser, token });
  } catch (error) {
    return next(errorHandle(400, error));
  }
};

// login user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(errorHandle(400, "Please enter all fields"));
    }
    const findUser = await userModel.findOne({ email }).select("+password");
    if (!findUser) {
      return next(errorHandle(401, "email or password is incorrect"));
    }
    const isMatch = await findUser.comparePassword(password);
    if (!isMatch) {
      return next(errorHandle(401, "email or password is incorrect"));

    }

    const token = await findUser.generateAuthToken();

    res.cookie("token", token);

    return res.status(200).json({
      message: "User logged in successfully",
      user: findUser,
      token,
    });
  } catch (error) {
    return next(errorHandle(400, error));
  }
};

// Get the current user Profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    return res.status(200).json({
      message: "User Profile Retrieved Successfully",
      user,
    });
  } catch (error) {
    return next(errorHandle(400, error));
  }
};

// Logout user
exports.logoutUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blackListTokenModel.create({ token });
  res.clearCookie("token");
  return res.status(200).json({ message: "User logged out successfully" });
};
