import Attendance from "../models/AttendanceModel.js";
import Teacher from "../models/TeacherModel.js";

export const getAttendance= async(req, res) =>{
    try {
        const response = await Attendance.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getAttendanceById = async(req, res) =>{
    try {
        const response = await Attendance.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// export const createAttendance = async(req, res) =>{
//     try {
//         await Attendance.create(req.body);
//         res.status(201).json({msg: "User Created"});
//     } catch (error) {
//         console.log(error.message);
//     }
// }
// ------------------------------------------mark attendance by checking teacher register or not
export const createAttendance = async (req, res) => {
    const { facultyId } = req.body;
  
    // Check if teacher exists in the teacher model
    const teacher = await Teacher.findOne({
       where:{ 
        facultyId:facultyId
    }
        });

  
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    else{
        // Create attendance record
        try {
            await Attendance.create(req.body);
            res.status(201).json({ msg: 'Attendance marked successfully' });
            // console.log("FacultyId from attendance mark ",facultyId);
            // console.log("Teacher Match ",teacher);

            } 
        catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Failed to mark attendance' });
            // console.log("FacultyId ",facultyId);

            }
    }
  
   
  };



// export const createAttendance = async (req, res) => {
//     const { teacher_faculty_id, course_id, date, present } = req.body;
//     const teacherQuery = `SELECT id FROM Teacher WHERE faculty_id = ${teacher_faculty_id}`;
//     try {
//       const [teacherRows] = await pool.query(teacherQuery);
//       if (teacherRows.length === 0) {
//         res.status(404).json({ msg: 'Teacher not found' });
//       } else {
//         const teacher_id = teacherRows[0].id;
//         const attendanceQuery = `INSERT INTO Attendance (teacher_id, course_id, date, present) VALUES (${teacher_id}, ${course_id}, '${date}', ${present})`;
//         await pool.query(attendanceQuery);
//         res.status(201).json({ msg: 'Attendance record created' });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ msg: 'Server error' });
//     }
//   };
  



// ----------------------------------------------


export const updateAttendance = async(req, res) =>{
    try {
        await Attendance.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteAttendance = async(req, res) =>{
    try {
        await Attendance.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}