import express from "express";
export const app = express();
import User from "./routes/userRoute.js";
import cookieParsor from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParsor());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);
app.use(cors());

app.use("/api/v1", User);

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Server is Working",
  });
});
