import express from "express";
// import { addUser } from "../controller/user-controller.js";
import { addUser } from "../Controllor/user-controller.js";
import {addManualAttendance} from "../Controllor/user-controller.js";
// import { Timetable } from "../controller/user-controller.js";
import { addTable } from "../Controllor/user-controller.js";
const router = express.Router();


router.post("/dashboard/Teachers", addUser)
router.post("/dashboard/Attendance", addManualAttendance)

router.post("/dashboard/Timetable", addTable)
export default router;