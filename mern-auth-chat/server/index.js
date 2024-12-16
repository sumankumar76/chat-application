import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";
import messageRoute from "./routes/messageRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { protect } from "./middleware/authMiddleware.js";
import path from "path";

dotenv.config({path:'./.env'});

// Set the server port from the environment or default to 5000
const port = process.env.PORT || 5000;
console.log(process.env.PORT);

connectDB();

const app = express();

app.use(express.json());
app.use(cors({origin:'*'}));
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded payloads
app.use(cookieParser());

// Define routes
app.use("/api/users", userRoute);
app.use("/api/chats", protect, chatRoute);
app.use("/api/messages", protect, messageRoute);

// Serve static files and handle frontend routing in development
if (process.env.NODE_ENV === "development") {
  const __dirname = path.resolve();
  const __rootdir = path.join(__dirname, "..");
  app.use(express.static(path.join(__rootdir, "/client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__rootdir, "client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
