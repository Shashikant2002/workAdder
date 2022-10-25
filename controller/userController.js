import { User } from "../models/userModel.js";
import { sendMail } from "../utils/sendMail.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { avtar } = req.files;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }

    const otp = Math.floor(Math.random() * 1000000);

    user = await User.create({
      name,
      email,
      password,
      avtar,
      otp,
      otp_expire: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
    });

    await sendMail(email, "Verify Your Account", `Your OTP: ${otp}`);



  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
