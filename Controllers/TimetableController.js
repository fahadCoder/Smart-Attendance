// import Teacher from "../models/TeacherModel.js";
import Timetable from "../models/TimetableModel.js";

// import User from "../models/UserModel.js";

export const getTimetable= async(req, res) =>{
    try {
        const response = await Timetable.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getTimetableById = async(req, res) =>{
    try {
        const response = await Timetable.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createTimetable = async(req, res) =>{
    try {
        await Timetable.create(req.body);
        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateTimetable = async(req, res) =>{
    try {
        await Timetable.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteTimetable = async(req, res) =>{
    try {
        await Timetable.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Timetable Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}