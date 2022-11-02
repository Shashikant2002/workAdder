import { app } from "./app.js";
import { config } from "dotenv";
import { connectDataBase } from "./config/database.js";

config({
  path: "./config/config.env",
});

connectDataBase();

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on Port http://localhost:${process.env.PORT}`);
});
