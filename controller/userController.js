import { User } from "../models/userModel.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }

    const otp = Math.floor(Math.random() * 1000000);
    await sendMail(email, "Verify Your Account", `Your OTP: ${otp}`);

    user = await User.create({
      name,
      email,
      password,
      avtar: {
        public_id: "",
        url: "",
      },
      otp,
      otp_expire: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
    });

    sendToken(
      res,
      user,
      201,
      "OTP Sended to your E-Mail, Please Veryfy Your Account"
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");
    const isMatch = await user.comparePassword(password);

    if (!user || !isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    sendToken(res, user, 200, "Login SuccessFull");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Logout SuccessFul",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const veryfy = async (req, res) => {
  try {
    const otp = Number(req.body.otp);
    const user = await User.findById(req.user._id);

    if (user.otp !== otp || user.otp_expire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP or has been Expired",
      });
    }
    user.veryfied = true;
    user.otp = null;
    user.otp_expire = null;

    await user.save();
    sendToken(res, user, 200, "Account Veryfied");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const allTasks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const allTasks = user.tasks;

    res.status(200).json({
      success: true,
      message: "Your All Tasks",
      allTasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = await User.findById(req.user._id);

    user.tasks.push({
      title,
      description,
      completed: false,
      createdAt: new Date(Date.now()),
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Task Added Successfull",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const removeTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const user = await User.findById(req.user._id);
    const tasks = await user.tasks;

    user.tasks = tasks.filter(
      (task) => task._id.toString() !== taskId.toString()
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfull",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const user = await User.findById(req.user._id);

    user.tasks = user.tasks.find(
      (task) => task._id.toString() !== taskId.toString()
    );

    user.tasks.completed = !user.tasks.completed;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Task Updated Successfull",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
