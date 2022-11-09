import express from "express";
import {
  register,
  veryfy,
  login,
  logout,
  addTask,
  allTasks,
  removeTask,
} from "../controller/userController.js";
import { isAuthenticated } from "../middleWare/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/verifyotp").post(isAuthenticated, veryfy);
router.route("/login").get(login);
router.route("/logout").get(logout);
router.route("/alltask").post(isAuthenticated, allTasks);
router.route("/addtask").post(isAuthenticated, addTask);
router.route("/removetask/:taskId").delete(isAuthenticated, removeTask);

export default router;
