import User from "../schema/user-schema.js";
import mannualAttendance from "../schema/AttendanceSchema.js";
import Table from "../Schema/TimetableSchema.js";

export const addUser = async (request, response) => {
    const user = request.body;
  
    const newUser = new User(user);
  
    try {
      await newUser.save();
      response.status(201).json(newUser);
    } catch (error) {
      response.status(409).json({ message: error.message });
    }
  };

  // Mannual Attendance
  export const addManualAttendance = async (request, response) => {
    const Mattendance = request.body;
  
    const newMattendance = new mannualAttendance(Mattendance);
  
    try {
      await newMattendance.save();
      response.status(201).json(newMattendance);
    } catch (error) {
      response.status(409).json({ message: error.message });
    }
  };
  // Timetable

  export const addTable = async (request, response) => {
    const table = request.body;
  
    const newTable = new Table(table);
  
    try {
      await newTable.save();
      response.status(201).json(newTable);
    } catch (error) {
      response.status(409).json({ message: error.message });
    }
  };