import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // connect to MongoDB using the URI stored in the environment variable
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
