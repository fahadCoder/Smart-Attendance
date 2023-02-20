import mongoose from "mongoose";
import autoIncrement from 'mongoose-auto-increment'


const tableSchema = mongoose.Schema({
    FacultyID: String,
    RoomNo: String,
    Batch: String,
    Course: String,
    TeacherName: String,
    StartTime: String,
    EndTime:String,
    Day:String

})

autoIncrement.initialize(mongoose.connection)
tableSchema.plugin(autoIncrement.plugin, 'Timetable')

const table = mongoose.model('Timetable', tableSchema)
export default table;