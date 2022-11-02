import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log(token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login First And try to veryfy",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    // console.log(req.user);

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
