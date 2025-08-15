import express from "express";
import cors from "cors";
import UserRouter from "./routes/User.routes.js";
import ContactRouter from "./routes/Contact.routes.js";
import connectDB from "./db.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"], // or a string if only one
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"], // ✅ should be an array
    credentials: true, // Optional, only if you're using cookies/auth headers
  })
);

app.use("/user", UserRouter);
app.use("/contact", ContactRouter);

try {
  console.log("connecting db");
  await connectDB();
  console.log("db connected");
} catch (error) {
  console.log(error.message);
}
app.listen(8000, () => {
  console.log("server is running on port 8000");
});
