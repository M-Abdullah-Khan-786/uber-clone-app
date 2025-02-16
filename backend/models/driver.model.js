const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const driverSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  vehicle:{
    vehicleType:{
        type: String,
        enum: ['car', 'bike', 'auto-rickshaw'],
        required: true
      },
      vehicleNumber:{
        type: String,
        required: true
      },
      vehicleColor:{
        type:String,
        required: true
      },
      vehicleName:{
        type:String,
        required: true
      },
      vehicleCapacity:{
        type: Number,
        required: true,
        min: [1, "Capacity must be at least 1"],
      }
    },
    location:{
        ltd:{
            type: Number,
        },
        lng:{
            type: Number,
        }
    }
});

driverSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {
      expiresIn: '4h'
    });
    return token;
}

driverSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
}

driverSchema.statics.hashPassword = function(password){
    return bcrypt.hash(password, 10);
}

module.exports = mongoose.model("Driver", driverSchema);
