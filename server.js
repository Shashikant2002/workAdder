import { app } from "./app.js";
import { config } from "dotenv";
import { connectDataBase } from "./config/database.js";
import cloudinary from "cloudinary";

config({
  path: "./config/config.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

connectDataBase();

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on Port http://localhost:${process.env.PORT}`);
});
