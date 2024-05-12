import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routers.js"
import courseRoute from "./routes/course.routes.js"
import instructorRoute from "./routes/instructor.routers.js"

const app = new express();

app.use(cors({origin: true, credentials: true}));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({limit: "16kb", extended: true}));
app.use(cookieParser());

app.use('/api/v1/user', userRoute);
app.use('/api/v1/course', courseRoute);
app.use('/api/v1/instructor', instructorRoute);

export default app;