import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [8, "Password Will Be in 8 Character"],
  },
  avtar: {
    public_Id: String,
    url: String,
  },
  userCreatedAt: {
    default: Date.now,
    type: Date,
  },
  tasks: [
    {
      title: "String",
      description: "String",
      completed: Boolean,
      createdAt: Date,
    },
  ],

  veryfied: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: Number,
  },
  otp_expire: {
    type: Date,
  },
  resetPasswordotp: Number,
  resetOtpExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

userSchema.methods.comparePassword = async function (password) {
  console.log(this.password);
  const comp = await bcrypt.compare(password, this.password);
  console.log(comp);
  return comp;
};

userSchema.index({ otp_expire: 1 }, { expireAfterSeconds: 0 });

export const User = mongoose.model("User", userSchema);
