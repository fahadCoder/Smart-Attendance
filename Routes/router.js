import express from "express";

import {
    getTeacher, 
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    loginTeacher,
    getTeacherTotal
} from "../Controllers/TeacherController.js";

import {
    getTimetable, 
    getTimetableById,
    createTimetable,
    updateTimetable,
    deleteTimetable
} from "../Controllers/TimetableController.js";

import {
    getAttendance, 
    getAttendanceById,
    createAttendance,
    updateAttendance,
    deleteAttendance
} from "../Controllers/AttendanceController.js";

import {
    createAdmin,
    getTotalAdmin,
    getAdmins,
    deleteAdmin,
   
} from "../Controllers/AdminController.js";


 import {
    getTimetableData,
    uploadExcel,
    getCurrentTimetable,
 } from "../Controllers/TimetableExcelController.js";

 import multer from 'multer';
 import session from 'express-session';

// import {DashboardTeacher} from "../../SmartAttendance/src/Teacher/DashboardTeacher";

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

const sessionMiddleware = session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
  });

// router.post('/dashboard/team', createCoordinator);

 

router.post('/dashboard/team', createAdmin);




router.get('/dashboard/Teachers', getTeacher);
router.get('/dashboard/Teachers/:id', getTeacherById);
router.post('/dashboard/Teachers', createTeacher);
router.patch('/dashboard/Teachers/:id', updateTeacher);
router.delete('/dashboard/Teachers/:id', deleteTeacher);

router.post('/Teacher', loginTeacher);
// router.get('/TeacherDashboard',getDashboard)

// router.get('/Teacherdashboard', DashboardTeacher);

// Total users for Admin dashboard
// router.get('/dashboard', getTeacherTotal);
router.get('/dashboard', getTotalAdmin);
router.get('/dashboard/team', getAdmins);
router.delete('/dashboard/team/:id', deleteAdmin);





router.get('/dashboard/Timetable', getTimetable);
router.get('/dashboard/Timetable/:id', getTimetableById);
// router.post('/dashboard/Timetable', createTimetable);
router.patch('/dashboard/Timetable/:id', updateTimetable);
router.delete('/dashboard/Timetable/:id', deleteTimetable);


router.get('/dashboard/Attendance', getAttendance);
router.get('/dashboard/Attendance/:id', getAttendanceById);
router.post('/dashboard/Attendance', createAttendance);
router.patch('/dashboard/Attendance/:id', updateAttendance);
router.delete('/dashboard/Attendance/:id', deleteAttendance);

// Teacher Login
// router.post('/teacher', login);


router.post('/dashboard/Timetable',upload.single('timetable'), uploadExcel);
router.get('/Teacherdashboard/TimetableTeacher', getTimetableData);
router.get('/Teacherdashboard',sessionMiddleware, getCurrentTimetable);


export default router;


