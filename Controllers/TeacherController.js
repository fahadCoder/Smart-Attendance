// import Teacher from "../models/TeacherModel.js";
import Teacher from "../models/TeacherModel.js";
import multer from 'multer';
import axios from 'axios';
import Attendance from "../models/AttendanceModel.js";
import Timetable from "../models/ExcelModel.js";

export const loginTeacher = async (req, res) => {
  try {
    const facultyId = req.body.FacultyID;
    const password = req.body.Password;

    const teacherData = await Teacher.findOne({
      where: {
        facultyId: facultyId,
        Password: password
      }
    });

    if (teacherData) {
      if (password === teacherData.Password) {
        
        if(teacherData.UpdatePassword===0)
        {
          res.status(200).send('ChangePassword');

        }
        else{
          res.status(200).send('Dashboard');

        }
        // res.status(200).json({ message: "login successful", facultyId: teacherData.facultyId });
        
      } else {
        res.status(401).json({ message: "email and password is incorrect" });
      }
    } else {
      res.status(401).json({ message: "email and password is incorrect" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: error.message });
  }
};





export const getTeacher= async(req, res) =>{
    try {
        const response = await Teacher.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getTeacherById = async(req, res) =>{
    try {
        const response = await Teacher.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}



export const getTeacherTotal = async (req, res) => {
    try {
      const total = await Teacher.count();
      res.status(200).json({ total });
    } catch (error) {
      console.log(error.message);
    }
  }
  
// -------------------------------------This APi is working fine i just comment that to write send teacher registration email
// export const createTeacher = async(req, res) =>{
//     try {
//         await Teacher.create(req.body);
//         res.status(201).json({msg: "User Created"});
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// thatts code working find just need API verifcation
// import sgMail from '@sendgrid/mail';
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// export const createTeacher = async (req, res) => {
//   try {
//     const newTeacher = await Teacher.create(req.body);

//     // Generate faculty ID and password
//     const facultyId = req.body.FacultyId;
//     const password = req.body.Password;

//     // Save faculty ID and password to the database
//     // await newTeacher.update({ facultyId, password });

//     // Send email to the teacher
//     const msg = {
//       to: 'rajafahadisrarahmed@gmail.com',
//       from: 'rajafahadisrar9@gmail.com',
//       subject: 'Faculty ID and Password',
//       text: `Your faculty ID is ${facultyId} and your password is ${password}.`,
//     };
//     await sgMail.send(msg);

//     res.status(201).json({ msg: 'User created' });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

import nodemailer from 'nodemailer';
export const createTeacher = async(req, res) =>{
    try {
        const teacher = await Teacher.create(req.body);

        // send email with faculty ID and password to new teacher
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'mussclefit@gmail.com',
                pass: 'dwkvribbolreglti'

            }
        });

        let mailOptions = {
            from: 'mussclefit@gmail.com',
            to: teacher.Email,
            // to: 'rajafahadisrarahmed@gmail.com',
            subject: 'Registration cardenalities',
            text: `Dear ${teacher.Name}, your registration have been completed.Now you can login through these cardenalities: \n\n facultyID :: ${teacher.facultyId} \n\n Password :: ${teacher.Password}.\n\n Please keep this information safe and secure.\n\nSmartAttendance`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
}


export const updateTeacher = async(req, res) =>{
    try {
        // const { id } = req.params;
        // const { name, email, phone } = req.body;

        const teacher = await Teacher.findOne({ where: {  id: req.params.id } });

        if (!teacher) {
            return res.status(404).json({ msg: "Teacher not found" });
        }

        // teacher.name = name;
        // teacher.email = email;
        // teacher.phone = phone;
        teacher.FacultyId=req.body.FacultyID;
        teacher.name=req.body.name;
        teacher.DOB=req.body.DOB;
        teacher.email=req.body.email;
        teacher.Password=req.body.Password;
        // teacher.gen=req.body.Gend;
        // teacher.adde=req.body.FacultyID;



        await teacher.update(req.body);

        res.status(200).json({msg: "Teacher updated successfully", teacher });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: "Internal server error"});
    }
}
export const deleteTeacher = async(req, res) =>{
  try {
      await Teacher.destroy({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "User Deleted"});
  } catch (error) {
      console.log(error.message);
  }
}
// Define the storage for uploaded images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Define the Flask API endpoint
const FLASK_API_URL = 'http://127.0.0.1:8000/predict';

export const GetResponseFromModel = async (req, res) => {
  try {
    // Create a form data object to send the image to the Flask API
    const form = new FormData();
    const blob = new Blob([req.file.buffer], { type: req.file.mimetype }); // Convert buffer to blob
    form.append('image', blob, req.file.originalname);

    // Send the image to the Flask API for recognition
    const response = await axios.post(FLASK_API_URL, form, { headers: form.getHeaders });
    
    if(response.data.identity=="unknown")
    {
      return { status: 404, msg: 'Unknown Person' };

    }
    // Call the attendance API to mark attendance for the recognized person
    const attendanceResult = await MarkAttendance(response.data.identity);

    
    // Set the response based on the attendance result
    if (attendanceResult.status === 201) {
      res.json(response.data);
    } else {
      res.status(attendanceResult.status).json({ msg: attendanceResult.msg });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Internal server error' });
  }
};


export const MarkAttendance = async (id) => {
  const  facultyid  = id;
  const currentDate = new Date();
  const currentTime = new Date().toLocaleTimeString();
console.log("id is : ",facultyid);
  // const attendance = {
  //   facultyId: facultyid,
  //   Time:currentTime,
  //   Date:currentDate,
  //   TeacherName:"Fahad",
  //   Status:"P",
  //   RoomNo:"Course",
  //   RoomNo:"g45",
  //   Course:"English"    
  // };

  // Check if teacher exists in the teacher model
  const teacher = await Teacher.findOne({
     where:{ 
      facultyId:facultyid
    }
  });

  if (!teacher) {
    return { status: 404, msg: 'Teacher not found' };
  } else {

    const user = await Timetable.findOne({ 
      where: {
        TeacherId:facultyid
        } });

        if (!user) {
          return res.status(404).json({ error: 'Today you have no class' });
        }
       
          // Extract username and course name from user object
            const { CourseName, TeacherName,Starttime,Endtime } = user;
            const duration = calculateDuration(Starttime, Endtime);

            const attendance = {
              facultyId: facultyid,
              Time:currentTime,
              Date:currentDate,
              TeacherName:TeacherName,
              Status:"P",
              RoomNo:duration,
              Course:CourseName    
            };

      // Create attendance record
      try {
          await Attendance.create(attendance);
          return { status: 201, msg: 'Attendance marked successfully' };
      } catch (error) {
          console.log(error.message);
          return { status: 500, msg: 'Failed to mark attendance' };
      }
  }
};

function calculateDuration(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const durationMs = end - start; // get duration in milliseconds
  const durationSec = durationMs / 1000; // convert to seconds
  const durationMin = durationSec / 60; // convert to minutes

  return durationMin;
}

export const OneTimePassword = async (req, res) => {
  const  id  = 13121
  const { Password } = req.body;
  const p=req.body.password;

  try {
    const teacher = await Teacher.findOne({ 
      where: {
        facultyId:id
        } });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    await Teacher.update(
      { 
        UpdatePassword: 1,
        Password:Password
    },
      {
        where: {
          facultyId:id
          }
      }
    );

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


