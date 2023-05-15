import express from "express";
// const wifi = require('node-wifi');
import wifi from 'node-wifi';
import {
    getTeacher, 
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    loginTeacher,
    getTeacherTotal,
    GetResponseFromModel,
    MarkAttendance,
    OneTimePassword,
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
    AdminLogin,
    GetPermissions,
    CollectDataset
   
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

// for live attendance mark 
const storage = multer.memoryStorage();
const upload2 = multer({ storage: storage });

export const CheckLoginAccess = async (req, res, next) => {
    // Check if user is connected to university WIFI
    try {
      await wifi.init({ iface: null }); // initialize the wifi module
      const currentConnections = await wifi.getCurrentConnections(); // get a list of currently connected WiFi networks
      const isUniversityWifi = currentConnections.some(connection => connection.ssid === 'FIRST FLOOR'); // check if any of the currently connected WiFi networks have the correct SSID
      if (isUniversityWifi) {
        // User is connected to university WIFI, allow login
        next();
      } else {
        // User is not connected to university WIFI, deny login
        res.status(401).json({ message: 'Unauthorized: You must be connected to the university WIFI to log in' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


router.post('/Teacher',CheckLoginAccess, loginTeacher);


router.post('/dashboard/team', createAdmin);




router.get('/dashboard/Teachers', getTeacher);
router.get('/dashboard/Teachers/:id', getTeacherById);
router.post('/dashboard/Teachers', createTeacher);
router.patch('/dashboard/Teachers/:id', updateTeacher);
router.delete('/dashboard/Teachers/:id', deleteTeacher);



router.get('/dashboard', getTotalAdmin);
router.get('/dashboard/team', getAdmins);
router.delete('/dashboard/team/:id', deleteAdmin);
router.post('/',AdminLogin);
router.post('/dashboard', CollectDataset);


// router.get('/dashboard', GetPermissions);



 

router.get('/dashboard/Timetable', getTimetable);
router.get('/dashboard/Timetable/:id', getTimetableById);
// router.post('/dashboard/Timetable', createTimetable);
router.patch('/dashboard/Timetable/:id', updateTimetable);
router.delete('/dashboard/Timetable/:id', deleteTimetable);


router.get('/dashboard/Attendance', getAttendance);
// router.get('/dashboard/Attendance/:id', getAttendanceById);
router.post('/dashboard/Attendance', createAttendance);
router.patch('/dashboard/Attendance/:id', updateAttendance);
router.delete('/dashboard/Attendance/:id', deleteAttendance);
 
// Teacher Login
// router.post('/teacher', login);


router.post('/dashboard/Timetable',upload.single('timetable'), uploadExcel);
router.get('/Teacherdashboard/TimetableTeacher', getTimetableData);
router.get('/Teacherdashboard', getCurrentTimetable);

// router.post('/Teacherdashboard', MarkAttendance);
router.post('/Teacherdashboard', upload2.single('image'),GetResponseFromModel);

router.get('/Teacherdashboard/TeacherAttendance/:id', getAttendanceById);
router.post('/OneTimePassword', OneTimePassword);



export default router;



