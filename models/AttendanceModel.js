import db from "../config/Database.js";
import { Sequelize, DataTypes } from "sequelize";

// const {Datatypes}=Sequelize;

const Attendance=db.define('attendance',{
    facultyId:DataTypes.STRING,
    TeacherName:DataTypes.STRING,
    Status:DataTypes.STRING,
    RoomNo:DataTypes.STRING,
    Course:DataTypes.STRING,
    Time:DataTypes.TIME,
    Date:DataTypes.DATE,
},{
    freezeTableName:true,
    timestamps: false, // this option disables createdAt and updatedAt fields

});

export default Attendance;

(async()=>{
    await db.sync();
})();
