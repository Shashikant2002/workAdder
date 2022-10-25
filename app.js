import express from "express";
export const app = express();
import User from "./routes/userRoute.js";

app.use("/", (req, res) => {
  res.send({
    message: "Success",
  });
});

app.use("/api/v1", User);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
