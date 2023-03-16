
import express from "express";
import cors from "cors";
import TeacherRoute from "./Routes/router.js";

const app = express();
app.use(cors());
app.use(express.json());
// app.use(UserRoute);
app.use(TeacherRoute);

app.listen(5000, ()=> console.log('Server up and running...5000'));





