import express from "express";
import {
    getTeacher, 
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher
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




const router = express.Router();

router.get('/dashboard/Teachers', getTeacher);
router.get('/dashboard/Teachers/:id', getTeacherById);
router.post('/dashboard/Teachers', createTeacher);
router.patch('/dashboard/Teachers/:id', updateTeacher);
router.delete('/dashboard/Teachers/:id', deleteTeacher);


router.get('/dashboard/Timetable', getTimetable);
router.get('/dashboard/Timetable/:id', getTimetableById);
router.post('/dashboard/Timetable', createTimetable);
router.patch('/dashboard/Timetable/:id', updateTimetable);
router.delete('/dashboard/Timetable/:id', deleteTimetable);


router.get('/dashboard/Attendance', getAttendance);
router.get('/dashboard/Attendance/:id', getAttendanceById);
router.post('/dashboard/Attendance', createAttendance);
router.patch('/dashboard/Attendance/:id', updateAttendance);
router.delete('/dashboard/Attendance/:id', deleteAttendance);






export default router;





















// // import conn from "../db/conn.js";
// import conn from "../DB/Conn.js";



// // Register new Teacher 
// router.post("/dashboard/Teachers",(req,res)=>{
//     // console.log(req.body);

//     const { FacultyId,Name,DOB,Email,Password,Gender,Address}=req.body;
//     if(!FacultyId || !Name || !DOB || !Email || !Password || !Gender || !Address)
//     {
//         res.status(422).json("form fields empty");
//     }
//     try{
//         conn.query("SELECT * FROM teacher WHERE email = ?",Email,(err,result)=>{
//             if(result.length){
//                 res.status(422).json("this data is already exist");
//             }else{
//                 conn.query("INSERT INTO teacher SET ?",{FacultyId,Name,DOB,Email,Password,Gender,Address},(err,result)=>{
//                     if(err){
//                         console.log("err"+err);
//                     }
//                     else{
//                         res.status(201).json(req.body);
//                     }
//                 })
//             }
//         })
//     }catch(error)
//     {
//         res.status(422).json("Error");

//     }

// });

// // module.exports=router;
// export default router;