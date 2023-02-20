import mongoose from "mongoose";
import autoIncrement from 'mongoose-auto-increment'

const userSchema = mongoose.Schema({
    FacultyId: String,
    Name: String,
    DOB: String,
    Email: String,
    Password: String,
    Gender: String,
    Address:String

})

autoIncrement.initialize(mongoose.connection)
userSchema.plugin(autoIncrement.plugin, 'user')

const user = mongoose.model('user', userSchema)

export default user;