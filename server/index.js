import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import courseRoute from "./routes/course.route.js";
import lectureRoute from "./routes/lecture.route.js";

dotenv.config({});

// call database connection
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;
// parse incoming requres with json payload
// app.use(bodyParser.json());
// parse incoming requrest with urlencoded payloads
// app.use(bodyParser.urlencoded({ extended: true }));

// default middlerware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/lecture", lectureRoute);

app.listen(PORT, () => {
  console.log(`Server listening at Port ${PORT}`);
});
