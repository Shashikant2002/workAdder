import mongoose from "mongoose";

export const connectDataBase = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
