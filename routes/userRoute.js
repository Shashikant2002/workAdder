import express from "express";
import {
  register,
  veryfy,
  login,
  logout,
  addTask,
  allTasks,
  removeTask,
  updateTask,
  getMyProfile,
  updateProfile,
  forgetPassword,
  reSetPassword,
  changePassword,
} from "../controller/userController.js";
import { isAuthenticated } from "../middleWare/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/verifyotp").post(isAuthenticated, veryfy);
router.route("/login").get(login);
router.route("/logout").get(isAuthenticated, logout);

router.route("/getmyprofile").get(isAuthenticated, getMyProfile);
router.route("/alltask").post(isAuthenticated, allTasks);
router.route("/addtask").post(isAuthenticated, addTask);
router.route("/removetask/:taskId").delete(isAuthenticated, removeTask);
router.route("/updatetask/:taskId").post(isAuthenticated, updateTask);
router.route("/updateprofile").put(isAuthenticated, updateProfile);

router.route("/updatepassword").put(isAuthenticated, changePassword);
router.route("/forgetpassword").post(forgetPassword);
router.route("/resetpassword").put(reSetPassword);

export default router;
