import express from "express";
export const app = express();
import User from "./routes/userRoute.js";
import cookieParsor from 'cookie-parser';

app.use(express.json());
app.use(cookieParsor());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", User);

app.get("/", (req, res) => {
  res.send({
    message: "Success Shashikant",
  });
});
