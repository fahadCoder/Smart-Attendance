import mongoose from "mongoose";
import autoIncrement from 'mongoose-auto-increment'


const AttendanceSchema = mongoose.Schema({
    FacultyID: String,
    TeacherName: String,
    Status: String,
    RoomNo: String,
    Course: String,
    Time: String,
    Date:Date

})

autoIncrement.initialize(mongoose.connection)
AttendanceSchema.plugin(autoIncrement.plugin, 'Attendance')

const Attendance = mongoose.model('Attendance', AttendanceSchema)
export default Attendance;