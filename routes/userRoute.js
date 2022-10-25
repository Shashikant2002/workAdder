import express from "express";
import { register } from "../controller/userController.js";
const router = express.Router();


router.route('/register').post(register);


export default router;