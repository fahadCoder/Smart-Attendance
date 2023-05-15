import Admin from "../models/AdminModel.js";
import Teacher from "../models/TeacherModel.js";
import Permissions from "../models/Permission.js";
import fs from "fs";
import NodeWebcam from "node-webcam";

import express from 'express';
import session from 'express-session';

 
export const createAdmin = async(req, res) =>{
    try {
        await Admin.create(req.body);
        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
}



export const AdminLogin = async (req, res) => {
  try {
    const facultyId = req.body.FacultyID;
    const password = req.body.Password;
    // const facultyId = "A45";
    // const password = "raheel123";

    const Details = await Admin.findOne({
      where: {
        facultyId: facultyId,
        Password: password,

      }
    });

    if (Details) {
      if (password === Details.Password) {
        req.session.facultyid = Details.FacultyID; // create session with FacultyID
        const userId = req.session.facultyid; // Access us
         console.log("session id in gettotal admin : ",userId);
        // req.session.save();
      // console.log("ajdncwd.l");
        // console.log("teacher ID is : ",req.session.facultyid);
        // res.status(200).json({ message: "login successful", facultyId: Details.facultyId });
        res.status(200).json({ message: "login successful"});

        // localStorage.setItem("FacultyId",re/q.session.facultyid);
        // console.log("local storage ", localStorage.getItem("FacultyId"));

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

export const getTotalAdmin = async (req, res) => {
  // const userId = req.session.facultyid; // Access us
  // console.log("session id in gettotal admin : ",userId);
    try {
      const adminCount = await Admin.count({
        where: { Role: 'Admin' }
      });
      const coordinatorCount = await Admin.count({
        where: { Role: 'Coordinator' }
      });
      const supervisorCount = await Admin.count({
        where: { Role: 'Supervisor' }
      });
      const TeacherCount = await Teacher.count();
      res.status(200).json({ 
        adminCount: adminCount, 
        coordinatorCount: coordinatorCount, 
        supervisorCount: supervisorCount ,
        teacherCount: TeacherCount 

      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Server error' });
    }
    
  };

  export const getAdmins= async(req, res) =>{
    try {
        const response = await Admin.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
  
export const deleteAdmin = async(req, res) =>{
    try {
        await Admin.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export const GetPermissions= async(req, res) =>{
  try {
      const response = await Permissions.findOne({
        where:{
          facultyId: 'CO12'
      }
      });
      console.log(response);
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}


export const CollectDataset= async (req, res) => {
  try {
    const folderName = req.body.folderName;
     // Check if the folder already exists
     if (fs.existsSync(folderName)) {
      return res.status(400).json({ message: "Folder already exists" });
    }
    else
    {
   // Create a folder in the machine directory
    fs.mkdirSync(folderName);
    }
 

    // Use node-webcam to capture 20 pictures with a 2-second delay
    const Webcam = NodeWebcam.create({});

    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const timestamp = new Date().getTime();
        const fileName = `${folderName}/image_${timestamp}.jpg`;
        Webcam.capture(fileName, (err, data) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Image ${i + 1} captured`);
          }
        });
      }, i * 2000);
    }

    res.json({ message: "Folder created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create folder" });
  }
}