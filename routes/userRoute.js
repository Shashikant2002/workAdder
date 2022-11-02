import express from "express";
import {
  register,
  veryfy,
  login,
  logout,
} from "../controller/userController.js";
import { isAuthenticated } from "../middleWare/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/verifyotp").post(isAuthenticated, veryfy);
router.route("/login").get(login);
router.route("/logout").get(logout);

export default router;
