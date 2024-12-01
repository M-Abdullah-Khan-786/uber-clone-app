const blackListTokenModel = require("../models/blackListToken.model");
const driverModel = require("../models/driver.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res, next) => {
  const token = req.cookies.token ||  req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "You are not authenticated" });
  }
  const isBlackList = await blackListTokenModel.findOne({token});
  if (isBlackList) {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decodedToken._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(403).json({ message: "Access denied" });
  }
};

exports.authenticateDriver = async (req, res, next) => {
  const token = req.cookies.token ||  req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "You are not authenticated" });
  }
  const isBlackList = await blackListTokenModel.findOne({token});
  if (isBlackList) {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const driver = await driverModel.findById(decodedToken._id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    req.driver = driver;
    return next();
  } catch (error) {
    return res.status(403).json({ message: "Access denied" });
  }
};