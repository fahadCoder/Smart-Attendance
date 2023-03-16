// // import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import { Sequelize, DataTypes } from "sequelize";

// const {Datatypes}=Sequelize;

const Timetable=db.define('timetable',{
    FacultyID:DataTypes.STRING,
    RoomNo:DataTypes.STRING,
    Batch:DataTypes.STRING,
    Course:DataTypes.STRING,
    StartTime:DataTypes.TIME,
    EndTime:DataTypes.TIME,
    TeacherName:DataTypes.STRING,
    Day:DataTypes.STRING,


},{
    freezeTableName:true,
    timestamps: false, // this option disables createdAt and updatedAt fields

});

export default Timetable;

(async()=>{
    await db.sync();
})();

