import mongoose from "mongoose";

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
    publicId: String,
    url: String,
  },
  userCreatedAt: {
    type: Date,
    default: Date.now,
  },
  tasks: [
    {
      title: "String",
      description: "String",
      completed: Boolean,
      createdAt: Date,
    },
  ],
  otp: {
    type: Number,
  },
  otp_expire: {
    type: Date,
  },
});

export const User = mongoose.model("User", userSchema);
