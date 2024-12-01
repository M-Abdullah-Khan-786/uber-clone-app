const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First Name must be at least 3 characters"],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, "Last Name must be at least 3 characters"],
    },
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {
      expiresIn: '4h'
    });
    return token;
}

userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = function(password){
    return bcrypt.hash(password, 10);
}

module.exports = mongoose.model("User", userSchema);
