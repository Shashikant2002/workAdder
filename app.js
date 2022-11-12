import express from "express";
export const app = express();
import User from "./routes/userRoute.js";
import cookieParsor from "cookie-parser";
import fileUpload from "express-fileupload";

app.use(express.json());
app.use(cookieParsor());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", User);
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);

app.get("/", (req, res) => {
  res.send({
    message: "Success Shashikant",
  });
});
